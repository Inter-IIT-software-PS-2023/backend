import reader from 'xlsx'
import { getGeocode } from '../../middleware/getGeocode'

type tempOrders = {     //this is a temporary type for the orders
    product_id: string,
    address: string,
    location: string,
    lng: number,
    lat: number,
    rider_name: string,
    rider_phone: number,
}

export const newXLSXUpload = async (path:string) => {
    // const file = reader.readFile("src/temp/data1.xlsx")
    const file = reader.readFile(path)
    const fields = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])
    return await Promise.all(fields.map(async (item: any) => {
        return getGeocode((item as any).address)
            .then(coords => {
                if (Array.isArray(coords))
                    return {
                        product_id: (item as any).product_id,
                        address: (item as any).address,
                        location: (item as any).location,
                        lng: coords[0],
                        lat: coords[1],
                        rider_name: (item as any).names,
                        rider_phone: (item as any).numbers
                    } as tempOrders
                else return coords
            })
            .catch(err => err)
    }))
}