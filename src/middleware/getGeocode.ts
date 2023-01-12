const api_key = process.env.MAPBOX_API_KEY

export const getGeocode = async (address: string) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${api_key}`
    const info = fetch(url)
        .then((res) => res.json())
        .then((data) => [data.features[0].center[0], data.features[0].center[1]] as [number, number])
        .catch((err) => new Error("Error in fetching geocodes"))
    return info 
}