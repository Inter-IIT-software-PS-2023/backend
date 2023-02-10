import { Request, Response } from "express";
import { parseNewOrders } from "../../services/orders/newOrders.services";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const newOrders = async (req: Request, res: Response) => {
    try {
        await prisma.address.deleteMany({})
        await prisma.item.deleteMany({})
        await prisma.order.deleteMany({})
        await prisma.cluster.deleteMany({})
        await prisma.rider.deleteMany({})
        const uploadResponse = await parseNewOrders(req.body)
        if (uploadResponse[0] instanceof Error)
            throw new Error(uploadResponse[0].message)
        res.status(200).json({ msg: "Orders uploaded successfully" })
    }
    catch (err) {
        res.status(400).send({ Err: (err as Error).message })
    }
}

