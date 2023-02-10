import { PrismaClient } from "@prisma/client"
import { measureInput } from "../../controllers/orders/measureItem.controller";

const prisma = new PrismaClient()

export const measureItemService = async (payload: measureInput) => {
    return await prisma.item.create({
        data: payload
    })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err.message)
            throw new Error(err);
        })
}