import { PrismaClient } from "@prisma/client"
import { messaging } from "firebase-admin"
import adminConfig from "../../admin/config"
const prisma = new PrismaClient()

export const addOrderService = async (address: string) => {
    const riderIdFromAlgo = "1"
    const rider = await prisma.rider.findUnique({
        where: {
            username: `dpartner_${riderIdFromAlgo}`
        }
    })
    if (!rider) {
        throw new Error("Cannot allot dynamic point")
    }
    else {
        const fcmToken = rider.fcmToken
        const message = {
            notification: {
                title: "New Order",
                body: "You have a new order to deliver"
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