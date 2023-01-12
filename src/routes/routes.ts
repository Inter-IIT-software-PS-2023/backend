import { Router } from "express";
import { newRoutes } from "../controllers/routes/newRoutes";

const router = Router();
console.log("routes.ts")
router.get('/new', newRoutes);

export default router;