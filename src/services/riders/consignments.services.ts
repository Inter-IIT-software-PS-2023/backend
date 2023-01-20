import jwt from "jsonwebtoken"

export const getRiderConsignments = async (token: string) => {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET || "")
    return decodedData
}