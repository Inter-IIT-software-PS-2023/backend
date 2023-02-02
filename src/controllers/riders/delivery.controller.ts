import { Request, Response } from "express";
import { deliveryService } from "../../services/riders/delivery.service";

export const deliveryController = async (req: Request, res: Response) => {
    try {
        const { productId, lat, lng } = req.body;
        const order = await deliveryService(productId, lat, lng);
        res.json({ msg: "Order delivered", data: order });
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ msg: "Cannot update order status" });
    }
}