import { Router } from "express";
import { runRoutingAlgo } from "../controllers/algo/runRoutingAlgo";

const algoRouter = Router();
algoRouter.get('/routing', runRoutingAlgo);

export default algoRouter;