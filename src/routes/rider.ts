import { Router } from "express";
import { runRoutingAlgo } from "../controllers/riders/routing.controller";
import { createNewRiders } from "../controllers/riders/newRiders.controller";
import { authRider } from "../controllers/riders/authRider.controller";

const riderRouter = Router();
riderRouter.get('/routing', runRoutingAlgo);
riderRouter.get('/new', createNewRiders);
riderRouter.post('/login', authRider);

export default riderRouter;