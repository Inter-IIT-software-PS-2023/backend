import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { routingAlgo } from "../../services/riders/routing.services";

const prisma = new PrismaClient()

export const runRoutingAlgo = async (req: Request, res: Response) => {
    try {
        const runAlgoResponse = await routingAlgo()
        res.json(runAlgoResponse)
    }
    catch (err) {
        res.status(400).send({ Err: (err as Error).message })
    }
}
