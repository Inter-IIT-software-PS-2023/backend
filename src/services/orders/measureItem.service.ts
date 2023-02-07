import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const measureItemService = async (objectType: string, payload: string, qrData: string) => {
    return await prisma.item.create({
        data: {
            objectType: objectType,
            payload: payload,
            qrData: qrData
        } as any
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err.message)
            throw new Error(err);
        })
}