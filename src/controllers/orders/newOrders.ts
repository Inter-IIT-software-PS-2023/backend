import { Request, Response } from "express";
import { newXLSXUpload } from "../../services/routes/newXLSXUpload";import multer from 'multer'

const upload = multer({ dest: './src/temp/' })

export const newOrders = async (req: Request, res: Response) => {
    try {
        upload.single("file")
        const filePath = req.file?.path as string
        const uploadResponse = await newXLSXUpload(filePath)
        if (uploadResponse[0] instanceof Error)
            throw new Error(uploadResponse[0].message)
        res.json(uploadResponse)
    }
    catch (err) {
        res.status(400).send({ Err: (err as Error).message })
    }
}

