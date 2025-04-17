import { Router } from "express";
import { createAnOrder, getOrderByEmail } from "../controllers/order.controller.js";

const orderRouter =  Router();

orderRouter.post("/", createAnOrder);
orderRouter.get("/email/:email", getOrderByEmail);

export default orderRouter;