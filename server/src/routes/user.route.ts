import { Router } from "express";
import {
  BasicLoginController,
  BasicSignupController,
} from "../controllers/auth.controller";
const UserRouter = Router();

UserRouter.post("/login", BasicLoginController);
UserRouter.post("/register", BasicSignupController);
