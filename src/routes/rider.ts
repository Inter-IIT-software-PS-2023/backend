import { Router } from "express";
import { runRoutingAlgo } from "../controllers/riders/routing.controller";
import { createNewRiders } from "../controllers/riders/newRiders.controller";

const riderRouter = Router();
riderRouter.get('/routing', runRoutingAlgo);
riderRouter.get('/new', createNewRiders);

export default riderRouter;