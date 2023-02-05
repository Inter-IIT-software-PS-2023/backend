import { Router } from "express";
import { addOrderController } from "../controllers/orders/addOrder.controller";
import { clearOrders } from "../controllers/orders/clearOrders.controller";
import { newOrders } from "../controllers/orders/newOrders.controller";

const orderRouter = Router();
orderRouter.post('/new', newOrders);
orderRouter.post('/add', addOrderController);
orderRouter.get('/clear', clearOrders);

export default orderRouter;