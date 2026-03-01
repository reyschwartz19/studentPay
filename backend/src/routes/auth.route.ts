import { Router } from "express";
import { loginController, refreshController, logoutController } from "../controllers/auth.controller";
import { authenticateToken } from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/refresh", refreshController);
authRouter.post("/logout",  logoutController);

export default authRouter;