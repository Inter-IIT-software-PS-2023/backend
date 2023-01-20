import { Request, Response } from "express";
import { parseNewOrders } from "../../services/orders/newOrders.services";

export const newOrders = async (req: Request, res: Response) => {
    try {
        const uploadResponse = await parseNewOrders(req.body)
        if (uploadResponse[0] instanceof Error)
            throw new Error(uploadResponse[0].message)
        res.json(uploadResponse)
    }
    catch (err) {
        res.status(400).send({ Err: (err as Error).message })
    }
}

