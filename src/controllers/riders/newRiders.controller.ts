import { Request, Response } from "express";
import { createNewRidersService } from "../../services/riders/newRiders.services";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const createNewRiders = async (req: Request, res: Response) => {
    try {
        const num = req.body.num
        const createNewRidersResponse = await createNewRidersService(num as number)
        await prisma.rider.createMany({
            data: createNewRidersResponse
        })
        res.json({ msg: "Riders created successfully", data: createNewRidersResponse })
    }
    catch (err) {
        res.status(400).send({ err: "Cannot assign riders" })
    }
}