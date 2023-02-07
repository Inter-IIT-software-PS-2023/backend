import { Request, Response } from "express";
import { measureItemService } from "../../services/orders/measureItem.service";

export type measureInput = {
    objectType: string;
    dimensions: string;
    area: number;
    height: number;
    volume: number;
    weight: number;
    qrData: string;
}

export const measureItemController = async (req: Request, res: Response) => {
    try {
        const { objectType, dimensions, area, height, volume, weight, qrData } = req.body.item;
        const payload: measureInput = {
            objectType,
            dimensions,
            area,
            height,
            volume,
            weight,
            qrData
        }
        const measureItemResponse = await measureItemService(payload);
        if (measureItemResponse instanceof Error)
            throw measureItemResponse;
        else
            res.json({ msg: "Measured values saved successfully" });
    }
    catch (err) {
        res.status(400).json({ err: "Error in saving measured values" });
    }
}