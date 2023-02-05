import { Order, PrismaClient } from "@prisma/client"
import { messaging } from "firebase-admin"
// import adminConfig from "../../admin/config"
import { getGeocode } from "../../middleware/getGeocode"
const prisma = new PrismaClient()

export const addOrderService = async (address: string) => {
    const newGeoCodes = await getGeocode(address)
        .then(async coords => coords)
        .catch(err => err)
    if (newGeoCodes instanceof Error)
        throw new Error("Error in fetching geocodes")
    else {
        // const fcmToken = rider.fcmToken
        // const message = {
        //     notification: {
        //         title: "New Pickup Point",
        //         body: "You have a new pickup point at " + address
        //     }
        // }
        const [lat, lng] = newGeoCodes
        const randomAWBnumber = Math.floor(Math.random() * 100000000000);
        const randomSKU_ID = `SKU_${Math.floor(Math.random() * 1000)}`
        await prisma.order.create({
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
                        location: ""
                    }
                }
            }
        })
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
        

        // messaging(adminConfig).sendToDevice(fcmToken, message)
        //     .then((response) => {
        //         console.log("Successfully sent message:", response);
        //     })
        //     .catch((error) => {
        //         console.log("Error sending message:", error);
        //     })
    }
}