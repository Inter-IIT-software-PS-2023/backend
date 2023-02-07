import { Request, Response } from "express";
import { measureItemService } from "../../services/orders/measureItem.service";

export const measureItemController = async (req: Request, res: Response) => {
    try {
        const { objectType, payload, qrData } = req.body.item;
        const measureItemResponse = await measureItemService(JSON.stringify(objectType), JSON.stringify(payload), JSON.stringify(qrData));
        if (measureItemResponse instanceof Error)
            throw measureItemResponse;
        else
            res.json({ msg: "Measured values saved successfully" });
    }
    catch (err) {
        res.status(400).json({ err: "Error in saving measured values" });
    }
}