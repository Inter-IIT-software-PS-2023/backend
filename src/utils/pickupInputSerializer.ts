export type pickupInputType = [{
    rider: {
        username: string
    },
    order: [{
        awb: string,
        reachTime: number,
        address: {
            lat: number,
            lng: number
        }
    }]
}]

export const pickupInputSerializer = (pickupInput: any) => {
    let orderCounter = 0
    const pickupOutput = pickupInput.map((cluster: any) => {
        return {
            riderId: cluster.rider.username.split("_")[1],
            route: cluster.order.map((order: any) => {
                orderCounter++;
                return {
                    awb: order.awb,
                    lat: order.address.lat,
                    lng: order.address.lng,
                    time: order.reachTime
                }
            })
        }
    })
    return [pickupOutput, orderCounter]
}