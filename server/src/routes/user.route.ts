import { Router } from "express";
import {
  DeleteUserController
} from "../controllers/user.controller";
const UserRouter = Router();

UserRouter.delete("/", DeleteUserController);



export default UserRouter;
