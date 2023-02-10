import dotenv from "dotenv"
dotenv.config()

const api_key = process.env.GOOGLE_MAP_API_KEY

export const getGeocode = async (address: string) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${api_key}`
    const info = fetch(url)
        .then((res) => res.json())
        .then((data) => [data.results[0].geometry.location.lat, data.results[0].geometry.location.lng] as [number, number])
        .catch((err) => new Error("Error in fetching geocodes"))
    return info
}