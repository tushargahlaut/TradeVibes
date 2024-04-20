import { Router } from "express";
import { CreatePostController, GetTop5PostsController } from "../controllers/post.controller";
import { VerifyTokenMiddleware } from "../auth/basic.auth";
const PostRouter = Router();

PostRouter.get("/top5", GetTop5PostsController);
PostRouter.post("/", VerifyTokenMiddleware, CreatePostController);
PostRouter.get("/:slug");

export default PostRouter;