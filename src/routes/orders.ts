import { Router } from "express";
import { newOrders } from "../controllers/orders/newOrders";

const orderRouter = Router();
orderRouter.post('/new', newOrders);

export default orderRouter;