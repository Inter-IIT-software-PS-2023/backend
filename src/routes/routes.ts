import { Router } from "express";
import { newRoutes } from "../controllers/routes/newRoutes";

const router = Router();
router.get('/new', newRoutes);

export default router;