import { Router } from "express";
import { adminLogin, getAdminStats } from "../controllers/admin.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const adminRouter = Router();

adminRouter.get('/', verifyToken, getAdminStats);
adminRouter.post('/login', adminLogin);

export default adminRouter;