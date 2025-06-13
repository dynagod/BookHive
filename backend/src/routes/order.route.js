import { Router } from "express";
import { cancelOrder, createAnOrder, getAllOrders, getOrderByEmail, updateOrderStatus } from "../controllers/order.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const orderRouter =  Router();

orderRouter.post("/", createAnOrder);
orderRouter.get("/email/:email", getOrderByEmail);
orderRouter.put('/:orderId', verifyToken, updateOrderStatus);
orderRouter.put('/cancel/:orderId', cancelOrder);
orderRouter.get('/get-all', verifyToken, getAllOrders);

export default orderRouter;