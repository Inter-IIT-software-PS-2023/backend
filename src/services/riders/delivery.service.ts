import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const deliveryService = async (productId: string) => {
    const updatedOrder = await prisma.order.update({
        where: {
            productId: productId
        },
        data: {
            status: "DELIVERED"
        }
    })
    return updatedOrder
}