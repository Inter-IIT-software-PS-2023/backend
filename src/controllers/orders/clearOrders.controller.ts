import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient()

export const clearOrders = async (req: Request, res: Response) => {
    try {
        await prisma.address.deleteMany({})
        await prisma.item.deleteMany({})
        await prisma.order.deleteMany({})
        await prisma.cluster.deleteMany({})
        await prisma.rider.deleteMany({})
        await prisma.rider.create({
            data: {
                username: "admin",
                password: "admin",
            }
        })
        res.json({ msg: "Ready to start fresh" })
    }
    catch (err) {
        res.status(400).send({ err: "Error in starting new process" })
    }
}