import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()
export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await prisma.item.findMany({})
        res.json(items)
    }
    catch (err) {
        res.status(400).json({ err: "Cannot get items" })
    }
}