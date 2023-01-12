import { Request, Response } from "express";
import { newXLSXUpload } from "../../services/routes/newXLSXUpload";

export const newRoutes = async (req: Request, res: Response) => {
    try {
        const uploadResponse = await newXLSXUpload()
        if (uploadResponse[0] instanceof Error)
            throw new Error(uploadResponse[0].message)
        res.json(uploadResponse)
    }
    catch (err) {
        res.status(400).send({ Err: (err as Error).message })
    }
}

