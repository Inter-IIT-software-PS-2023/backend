import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export const authRiderService = async (username: string, password: string) => {
    try {
        const rider: any = await prisma.rider.findUnique({
            where: {
                username: username
            } as any
        })
        if (!rider) {
            throw new Error("Rider does not exist")
        }
        else if (rider.password !== password) {
            throw new Error("Password is incorrect")
        }
        else {
            const token = jwt.sign({ id: rider.id }, process.env.JWT_SECRET as string, { expiresIn: '1d' })
            return { token: token, login: true }
        }
    }
    catch (err: any) {
        throw new Error(err.message)
    }
}