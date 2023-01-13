import { Router } from "express";
import { newOrders } from "../controllers/orders/newOrders";

const orderRouter = Router();
orderRouter.get('/new', newOrders);

export default orderRouter;