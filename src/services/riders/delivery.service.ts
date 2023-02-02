import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const deliveryService = async (productId: string, lat: string, lng: string) => {
    const updatedOrder = await prisma.order.update({
        where: {
            productId: productId
        },
        data: {
            status: "DELIVERED",
            deliveryLat: parseFloat(lat),
            deliveryLng: parseFloat(lng)
        }
    })
    return updatedOrder
}