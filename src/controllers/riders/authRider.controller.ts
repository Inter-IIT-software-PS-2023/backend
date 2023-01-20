import { Request, Response } from "express";
import { authRiderService } from "../../services/riders/authRider.service";

export const authRider = async (req: Request, res: Response) => {
    try {
        const authRiderResponse = await authRiderService(req.body.username as string, req.body.password as string)
        if(authRiderResponse instanceof Error) 
            throw new Error(authRiderResponse.message)
            else{
                res.json(authRiderResponse)
            }
    }
    catch (err: any) {
        res.status(400).json({ message: err.message })
    }
}