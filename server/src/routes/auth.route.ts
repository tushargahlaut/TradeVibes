import { Router } from "express";
import {
  BasicLoginController,
  BasicSignupController,
} from "../controllers/auth.controller";
const AuthRouter = Router();

AuthRouter.post("/login", BasicLoginController);
AuthRouter.post("/register", BasicSignupController);

export default AuthRouter;
