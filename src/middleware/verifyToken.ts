import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers["authorization"];
    if (token) {
        token = token.split(" ")[1];
        const key = process.env.JWT_SECRET;
        jwt.verify(token, key!, (error: any, valid: any) => {
            if (error) {
                res.status(401).send("Please provide valid token");
            } else {
                next();
            }
        });
    } else {
        res.status(403).send("Please add token with header");
    }
}