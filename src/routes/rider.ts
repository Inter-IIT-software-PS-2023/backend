import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken";
import { runRoutingAlgo } from "../controllers/riders/routing.controller";
import { createNewRiders } from "../controllers/riders/newRiders.controller";
import { authRider } from "../controllers/riders/authRider.controller";
import { riderConsignments } from "../controllers/riders/consignments.controller";
import { deliveryController } from "../controllers/riders/delivery.controller";
import { getRoutingResults } from "../controllers/riders/routingResults.controller";

const riderRouter = Router();
riderRouter.get('/routing', runRoutingAlgo);
// Added new route for pooling
riderRouter.get('/getRouting', getRoutingResults)
riderRouter.post('/new', createNewRiders);
riderRouter.post('/login', authRider);
riderRouter.get('/consignments', verifyToken, riderConsignments);
riderRouter.post('/delivery', verifyToken, deliveryController);

export default riderRouter;