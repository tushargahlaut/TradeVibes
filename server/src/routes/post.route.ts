import { Router } from "express";
import { CreatePostController, GetTop5PostsController } from "../controllers/post.controller";
import { VerifyTokenMiddleware } from "../auth/basic.auth";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const PostRouter = Router();

PostRouter.get("/top5", GetTop5PostsController);
PostRouter.post("/", VerifyTokenMiddleware, upload.single('image'), CreatePostController);
PostRouter.get("/:slug");

export default PostRouter;