import { Request, Response } from "express";
import { addOrderService } from "../../services/orders/addOrder.service";

export const addOrderController = async (req: Request, res: Response) => {
    try {
        const address = req.body.address;
        const addOrderResponse = await addOrderService(address);
        res.json(addOrderResponse);
    }
    catch (err) {
        res.status(400).json({ err: (err as Error).message });
    }
}