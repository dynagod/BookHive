import { Router } from "express";
import { adminLogin, getAdminStats } from "../controllers/admin.controller.js";

const adminRouter = Router();

adminRouter.get('/', getAdminStats);
adminRouter.post('/login', adminLogin);

export default adminRouter;