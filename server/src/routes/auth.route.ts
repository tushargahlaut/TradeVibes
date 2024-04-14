import { Router } from "express";
import {
  BasicLoginController,
  BasicSignupController,
  GoogleAuthController,
} from "../controllers/auth.controller";
const AuthRouter = Router();

AuthRouter.post("/login", BasicLoginController);
AuthRouter.post("/register", BasicSignupController);
AuthRouter.post("/google", GoogleAuthController);


export default AuthRouter;
