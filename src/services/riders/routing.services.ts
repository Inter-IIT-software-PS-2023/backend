import { exec } from "child_process"
import { Cluster, Order, PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"

const prisma = new PrismaClient()


export const routingAlgo = async () => {

    const consignments = await prisma.order.findMany({
        include: {
            address: true
        }
    }) as any
    const riders = await prisma.rider.findMany({})
    const noOfOrders = consignments.length
    const noOfRiders = await prisma.rider.count() - 1   // subtracting admin
    const noOfHours = 5
    const warehouseLocation = {
        lat: 12.971599,
        lng: 77.638725
    }
    let algoInput = {
        noOfOrders: noOfOrders,
        noOfRiders: noOfRiders,
        warehouseLocation: warehouseLocation,
        consignments: consignments
    } as any
    const execPath = path.join(__dirname, "../../../src/algorithms/tsp.out")
    // const execPath = path.join(__dirname, "../../../src/algorithms/exe")
    const inputFilePath = path.join(__dirname, "../../../src/algorithms/input1.txt")
    const outputFilePath = path.join(__dirname, "../../../src/algorithms/output.txt")
    algoInput = JSON.stringify(algoInput)
    algoInput.replace("\n", " ")
    const algoOutput = new Promise((resolve, reject) => {
        fs.writeFile(inputFilePath, algoInput, (err) => {
            if (err) {
                reject({ err: err.message })
            }
            else {
                exec(`"${execPath}" ${noOfHours} < "${inputFilePath}"`, (err) => {
                    if (err) {
                        console.log("err ", err)
                        reject({ err: err.message })
                    }
                    fs.readFile(outputFilePath, async (err, data) => {
                        if (err)
                            reject({ err: err.message })
                        else {
                            const outputFileData = JSON.parse(data.toString())
                            const newOrderPromises = outputFileData.clusters.map(async (item: any) => {
                                if (item === null) return Promise.resolve()
                                item.route?.shift()
                                const endTime = item.route?.pop()?.time
                                const rider = riders.find((rider: any) => rider.username === `dpartner_${item.riderId}`) as any
                                const newCluster: Cluster = await prisma.cluster.create({
                                    data: {
                                        riderId: rider.id,
                                        endTime: endTime
                                    } as any,
                                    include: {
                                        order: true
                                    }
                                })
                                return item.route?.map(async (order: any) => {
                                    return new Promise(async (resolve, reject) => {
                                        const newOrder: Order = await prisma.order.update({
                                            where: {
                                                awb: order.awb
                                            } as any,
                                            data: {
                                                clusterId: newCluster.id,
                                                reachTime: order.time,
                                                status: "ASSIGNED"
                                            }
                                        })
                                            .catch(err => { throw new Error("Error in updating orders") })
                                        resolve(newOrder)
                                    })
                                })

                            })
                            Promise.all(newOrderPromises)
                                .then(async () => {
                                    resolve(await prisma.cluster.findMany({
                                        include: {
                                            order: {
                                                include: {
                                                    address: true
                                                }
                                            },
                                            rider: true
                                        }
                                    }))
                                })
                        }
                    })
                })
            }
        })
    })
    return algoOutput
}