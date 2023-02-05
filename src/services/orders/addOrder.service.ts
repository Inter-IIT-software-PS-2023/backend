import { PrismaClient } from "@prisma/client"
import { messaging } from "firebase-admin"
// import adminConfig from "../../admin/config"
import { getGeocode } from "../../middleware/getGeocode"
const prisma = new PrismaClient()

export const addOrderService = async (address: string) => {
    const riderIdFromAlgo = "1"
    const newGeoCodes = await getGeocode(address)
        .then(async coords => coords)
        .catch(err => err)
    if (newGeoCodes instanceof Error)
        throw new Error("Error in fetching geocodes")
    else {
        const rider = await prisma.rider.findUnique({
            where: {
                username: `dpartner_${riderIdFromAlgo}`
            }
        })
        if (!rider) {
            throw new Error("Cannot allot dynamic point")
        }
        else {
            // const fcmToken = rider.fcmToken
            // const message = {
            //     notification: {
            //         title: "New Pickup Point",
            //         body: "You have a new pickup point at " + address
            //     }
            // }
            // messaging(adminConfig).sendToDevice(fcmToken, message)
            //     .then((response) => {
            //         console.log("Successfully sent message:", response);
            //     })
            //     .catch((error) => {
            //         console.log("Error sending message:", error);
            //     })
            
        }
    }
}