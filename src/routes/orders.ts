import { Router } from "express";
import { clearOrders } from "../controllers/orders/clearOrders.controller";
import { newOrders } from "../controllers/orders/newOrders.controller";

const orderRouter = Router();
orderRouter.post('/new', newOrders);
orderRouter.get('/clear', clearOrders);

export default orderRouter;