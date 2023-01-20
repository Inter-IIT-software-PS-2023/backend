import { generatePassword } from "../../middleware/getRandomPassword"

export const createNewRidersService = async (n:number) => {
    return new Array(n).fill(0).map((_, i) => {
        return {
            username: `dpartner_${i+1}`,
            password: generatePassword()
        }
    })
}