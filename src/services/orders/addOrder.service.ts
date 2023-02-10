import { Order, PrismaClient, Rider } from "@prisma/client"
import { messaging } from "firebase-admin"
import path from "path"
import fs from "fs"
import adminConfig from "../../admin/config"
import { getGeocode } from "../../middleware/getGeocode"
import { pickupInputSerializer } from "../../utils/pickupInputSerializer"
import { exec } from "child_process"
const prisma = new PrismaClient()

export const addOrderService = async (address: string) => {
    const newGeoCodes = await getGeocode(address)
        .then(async coords => coords)
        .catch(err => err)
    if (newGeoCodes instanceof Error)
        throw new Error("Error in fetching geocodes")
    else {
        const [lat, lng]: [number, number] = newGeoCodes
        const randomAWBnumber: number = Math.floor(Math.random() * 100000000000);
        const randomSKU_ID: string = `SKU_${Math.floor(Math.random() * 1000)}`
        const pickupInputFile = path.join(__dirname, "../../../src/algorithms/pickupInput.txt")
        const pickupOutputFile = path.join(__dirname, "../../../src/algorithms/output.txt")
        const execPath = path.join(__dirname, "../../../src/algorithms/dyn.out")
        const newPickupPoint: Order = await prisma.order.create({
            data: {
                awb: `${randomAWBnumber}`,
                productId: randomSKU_ID,
                name: "warehouse",
                status: "PENDING",
                isDynamicPoint: true,
                address: {
                    create: {
                        address: address,
                        lat: lat,
                        lng: lng,
                    }
                }
            },
            include: {
                address: true
            }
        })
        const clusters = await prisma.cluster.findMany({
            where: {
                order: {
                    every: {
                        status: "ASSIGNED"
                    }
                }
            },
            select: {
                rider: {
                    select: {
                        username: true
                    }
                },
                order: {
                    select: {
                        awb: true,
                        reachTime: true,
                        address: {
                            select: {
                                lat: true,
                                lng: true
                            }
                        }
                    }
                }
            }
        })
            .then(clusters => clusters)
            .catch(err => { throw new Error("Cannot add dynamic point") })
        const [serializedClusters, noOfOrders] = pickupInputSerializer(clusters)
        const noOfRiders = await prisma.rider.count() - 1   // subtracting admin
        const noOfHours = 5
        const warehouseLocation = {
            lat: 12.971599,
            lng: 77.638725
        }
        const pickupInput = {
            noOfOrders: noOfOrders,
            noOfRiders: noOfRiders,
            warehouseLocation: warehouseLocation,
            consignments: [newPickupPoint],
            clusters: serializedClusters
        }
        const pickupResponse = new Promise(async (resolve, reject) => {
            fs.writeFile(pickupInputFile, JSON.stringify(pickupInput), (err) => {
                if (err) {
                    reject({ err: err.message })
                }
                else {
                    exec(`"${execPath}" ${noOfHours} < "${pickupInputFile}"`, (err) => {
                        if (err) {
                            reject({ err: err.message })
                        }
                        else {
                            fs.readFile(pickupOutputFile, async (err, data) => {
                                if (err) {
                                    reject({ err: err.message })
                                }
                                else {
                                    const outputFileData = JSON.parse(data.toString())
                                    const riderId = outputFileData.cluster[0].riderId
                                    const rider: Rider | null = await prisma.rider.findUnique({
                                        where: {
                                            username: `dpartner_${riderId}`
                                        }
                                    })
                                    if (rider === null) {
                                        throw new Error("Rider not found")
                                    }
                                    else {
                                        const newReachTime = outputFileData.cluster[0].route.filter((route: any) => route.awb === randomAWBnumber).reachTime
                                        const updatedOrder = await prisma.order.update({
                                            where: {
                                                awb: `${randomAWBnumber}`
                                            },
                                            data: {
                                                status: "ASSIGNED",
                                                reachTime: newReachTime,
                                                rider: {
                                                    connect: {
                                                        username: `dpartner_${riderId}`
                                                    }
                                                }
                                            } as any
                                        })
                                            .catch(err => { throw new Error("Cannot find rider to update") })
                                        const fcmToken = rider.fcmToken
                                        const message = {
                                            notification: {
                                                title: "New Pickup Point",
                                                body: "You have a new pickup point at " + address
                                            }
                                        }

                                        messaging(adminConfig).sendToDevice(fcmToken, message)
                                            .then((response) => {
                                                console.log("Successfully sent message:", response);
                                            })
                                            .catch((error) => {
                                                console.log("Error sending message:", error);
                                            })
                                    }
                                }
                            })
                        }
                    })
                }
            })
            resolve(await prisma.cluster.findMany({
                include: {
                    order: {
                        include: {
                            address: true
                        }
                    },
                    rider: true
                }
            })
                .then(clusters => clusters)
                .catch(err => { throw new Error("Cannot add dynamic point") })
            )
        })
        return pickupResponse
    }
}