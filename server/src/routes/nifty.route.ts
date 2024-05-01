import { Router } from "express";
import { GetNiftyDataController } from "../controllers/nifty.controller";

const NiftyRouter = Router();

NiftyRouter.get("/", GetNiftyDataController);

export default NiftyRouter