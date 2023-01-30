import { spawn } from "child_process"
import { PrismaClient } from "@prisma/client"
import fs from "fs"

const prisma = new PrismaClient()

export const routingAlgo = async () => {

    const consignments = await prisma.order.findMany({
        include: {
            address: true
        }
    }) as any
    const noOfOrders = consignments.length
    const noOfRiders = await prisma.rider.count()
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
    algoInput = JSON.stringify(algoInput)
    algoInput.replace("\n", " ")
    const algoOutput = new Promise((resolve, reject) => {
        fs.writeFile("input1.txt", algoInput, (err) => {
            if (err) {
                reject({ err: err.message })
            }
            else {
                const child = spawn("./src/services/riders/exe", [noOfOrders, noOfRiders, "12.971599", "77.638725"])
                child.stdout.on("data", () => {
                    fs.readFile("./output.txt", (err, data) => {
                        if (err)
                            reject({ err: err.message })
                        else {
                            resolve(JSON.parse(data.toString()))
                        }
                    })
                })
                child.stderr.on("data", (data: Buffer) => {
                    console.log(data.toString())
                    reject({ err: data.toString() })
                })
            }
        })
    })
    return algoOutput
}