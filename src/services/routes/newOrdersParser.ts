import reader from 'xlsx'
import { getGeocode } from '../../middleware/getGeocode'

type tempOrders = {     //this is a temporary type for the orders
    product_id: string,
    address: string,
    location: string,
    lng: number,
    lat: number,
    customer_name: string,
    customer_phone: number,
}

export const newXLSXUpload = async (data:any[]) => {
    return await Promise.all(data.map(async (item: any) => {
        return getGeocode((item as any).address)
            .then(coords => {
                if (Array.isArray(coords))
                    return {
                        product_id: (item as any).product_id,
                        address: (item as any).address,
                        location: (item as any).location,
                        lng: coords[0],
                        lat: coords[1],
                        customer_name: (item as any).names,
                        customer_phone: (item as any).numbers
                    } as tempOrders
                else return coords
            })
            .catch(err => err)
    }))
}