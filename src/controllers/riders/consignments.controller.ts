import { Request, Response } from "express";
import { getRiderConsignments } from "../../services/riders/consignments.services";

export const riderConsignments = async (req: Request, res: Response) => {
    try {
        const token = (req.headers["authorization"] as string).split(" ")[1];
        const consignments = await getRiderConsignments(token);
        res.json({ message: "Hello World", data: consignments })
    }
    catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}