import { Router } from "express";
import { runRoutingAlgo } from "../controllers/rider/runRoutingAlgo";

const riderRouter = Router();
riderRouter.get('/routing', runRoutingAlgo);

export default riderRouter;