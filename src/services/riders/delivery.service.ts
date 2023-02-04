import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const deliveryService = async (awb: string, lat: string, lng: string) => {
    const date = new Date()
    const deliveryTimeInMins = (date.getHours() - 3) * 60 + date.getMinutes()- 30 
    // 5 hours and 30 mins is difference between IST and UTC time    
    // We assume that the delivery process starts at 9 am IST
    // So we subtract 3 hours 30 mins from the current time to get the time in UTC
    const updatedOrder = await prisma.order.update({
        where: {
            awb: awb
        } as any,
        data: {
            status: "DELIVERED",
            deliveryLat: parseFloat(lat),
            deliveryLng: parseFloat(lng),
            deliveryTime: deliveryTimeInMins
        }
    })
    return updatedOrder
}