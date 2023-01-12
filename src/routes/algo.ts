import { Router } from "express";
import { runRoutingAlgo } from "../controllers/algo/runRoutingAlgo";

const router = Router();
router.get('/routing', runRoutingAlgo);

export default router;