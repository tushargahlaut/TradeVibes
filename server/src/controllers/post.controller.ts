import { Request, Response } from "express";
import { CreatePostService, GetTop5PostsService } from "../services/post.service";

export const GetTop5PostsController = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const top5PostsSResult = await GetTop5PostsService();

        return res.status(200).json({
            success:true,
            data: top5PostsSResult
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch posts, try again later"
        });
    }
}

export const CreatePostController = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const {heading, description, image_url} = req.body;
        const user: any = req["user"]
        const userDetails = user["payload"];
        console.log("User Details", userDetails);
        const createPostResult = await CreatePostService({heading, description, image_url, userDetails: userDetails});
        return res.status(200).json({
            success: true,
            data: createPostResult
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to create post, try again later"
        });
    }
}