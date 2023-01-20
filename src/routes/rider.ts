import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { runRoutingAlgo } from "../controllers/riders/routing.controller";
import { createNewRiders } from "../controllers/riders/newRiders.controller";
import { authRider } from "../controllers/riders/authRider.controller";
import { riderConsignments } from "../controllers/riders/consignments.controller";

const riderRouter = Router();
riderRouter.get('/routing', runRoutingAlgo);
riderRouter.get('/new', createNewRiders);
riderRouter.post('/login', authRider);
riderRouter.get('/consignments', verifyToken, riderConsignments);

export default riderRouter;