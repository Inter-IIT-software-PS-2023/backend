import { createClient } from "redis";

const redisClient = createClient();
const REDIS_KEY = "algokey"

async function initializeClient(){
    await redisClient.connect();
}

export {initializeClient, redisClient, REDIS_KEY}