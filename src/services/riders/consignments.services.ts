import { PrismaClient } from "@prisma/client"
import { Cluster } from "@prisma/client";
import { Order } from "@prisma/client";

const prisma = new PrismaClient()

export const getRiderConsignments = async (token: string) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    const riderId = JSON.parse(atob(base64)).id
    const cluster = await prisma.cluster.findUnique({
        where: {
            riderId: riderId
        }
    }) as Cluster
    const consignments = await prisma.order.findMany({
        where: {
            clusterId: cluster.id
        },
        include: {
            address: true,
        }
    }) as Order[]
    return consignments
}