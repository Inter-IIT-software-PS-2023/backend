import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const deliveryService = async (awb: string, lat: string, lng: string) => {
    const updatedOrder = await prisma.order.update({
        where: {
            awb: awb
        } as any,
        data: {
            status: "DELIVERED",
            deliveryLat: parseFloat(lat),
            deliveryLng: parseFloat(lng)
        }
    })
    return updatedOrder
}