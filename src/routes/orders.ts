import { Router } from "express";
import { addOrderController } from "../controllers/orders/addOrder.controller";
import { clearOrders } from "../controllers/orders/clearOrders.controller";
import { getItems } from "../controllers/orders/getItems.controller";
import { measureItemController } from "../controllers/orders/measureItem.controller";
import { newOrders } from "../controllers/orders/newOrders.controller";

const orderRouter = Router();
orderRouter.post('/new', newOrders);
orderRouter.post('/add', addOrderController);
orderRouter.post('/measure', measureItemController);
orderRouter.get('/clear', clearOrders);
orderRouter.get('/items', getItems);

export default orderRouter;