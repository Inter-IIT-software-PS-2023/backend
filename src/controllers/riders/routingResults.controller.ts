import {REDIS_KEY, redisClient} from "../../utils/redisClient";
import {Request, Response} from "express";

export const getRoutingResults = async (req: Request, res: Response) => {
    try{
        const results = await redisClient.get(REDIS_KEY)
        if(results){
            res.json(JSON.stringify(results))
        }
        else{
            res.json("Response not ready yet")
        }
    }catch(err){
        res.status(500).send({Err: (err as Error).message})
    }
}