import { Router } from "express";
import { CommentPostController, CreatePostController, GetLatestPostsController, GetSinglePostController, GetTop5PostsController, LikePostController } from "../controllers/post.controller";
import { VerifyTokenMiddleware } from "../auth/basic.auth";
import multer from 'multer';
 
declare global {
    namespace Express {
      interface Request {
        image?: Express.Multer.File;
      }
    }
  }

const storage = multer.memoryStorage();
const upload = multer({ storage });

const PostRouter = Router();

PostRouter.get("/top5", GetTop5PostsController);
PostRouter.get("/", GetLatestPostsController);
PostRouter.get("/:slug", GetSinglePostController);
PostRouter.post("/", VerifyTokenMiddleware, upload.single('image'), CreatePostController);
PostRouter.post("/like", VerifyTokenMiddleware, LikePostController);
PostRouter.post("/comment", VerifyTokenMiddleware, CommentPostController);



export default PostRouter;