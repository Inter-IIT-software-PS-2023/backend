import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { routingAlgo } from "../../services/riders/routing.services";
import { redisClient, REDIS_KEY } from "../../utils/redisClient";

const prisma = new PrismaClient()

export const runRoutingAlgo = async (req: Request, res: Response) => {
    try {
        await prisma.order.updateMany({
            where: {
                status: "ASSIGNED",
            },
            data: {
                status: "PENDING",
                clusterId: null
            }
        })
        await prisma.cluster.deleteMany({})
        async () => {
            console.log("Algo running async")
            const runAlgoResponse = await routingAlgo()
            // redisClient.set(REDIS_KEY, JSON.stringify(runAlgoResponse))
            res.json(JSON.stringify(runAlgoResponse))
        }
        // res.json("Routing algo started, pool to /rider/getRouting")
    }
    catch (err) {
        res.status(400).send({ Err: (err as Error).message })
    }
}
