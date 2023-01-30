import { Request, Response } from "express";
import { routingAlgo } from "../../services/riders/routing.services";

export const runRoutingAlgo = async (req: Request, res: Response) => {
    try {
        const runAlgoResponse = await routingAlgo() as Promise<any>
        runAlgoResponse
            .then((data) => {
                res.json(data)
            })
            .catch((err) => {
                res.status(400).send({ Err: (err as Error).message })
            })
    }
    catch (err) {
        res.status(400).send({ Err: (err as Error).message })
    }
}
