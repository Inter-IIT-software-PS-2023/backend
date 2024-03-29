import { PrismaClient } from '@prisma/client'
import { getGeocode } from '../../middleware/getGeocode'

const prisma = new PrismaClient()

type tempOrders = {     //this is a temporary type for the orders
    product_id: string,
    address: string,
    lng: number,
    lat: number,
    name: string,
    awb: number,
}

export const parseNewOrders = async (data: any[]) => {
    return await Promise.all(data.map(async (item: any) => {
        return getGeocode((item as any).address)
            .then(async coords => {
                if (Array.isArray(coords)) {
                    const createOrder = await prisma.order.create({
                        data: {
                            productId: (item as any).product_id,
                            name: (item as any).names,
                            status: "PENDING",
                            awb: `${(item as any).AWB}`,
                            address: {
                                create: {
                                    address: (item as any).address,
                                    lat: coords[0],
                                    lng: coords[1],
                                }
                            }
                        } as any,
                        include: {
                            address: true
                        }
                    })
                    return
                }
                else return coords
            })
            .catch(err => err)
    }))
}