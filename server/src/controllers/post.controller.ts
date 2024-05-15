import { Request, Response } from "express";
import { CreatePostService, GetLatestPostsService, GetSinglePostService, GetTop5PostsService } from "../services/post.service";
import { handleCloudinaryUpload } from "../services/cloudinary.service";

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

export const GetLatestPostsController = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const query = req.query;
        
        const skip = query.skip !== undefined ? parseInt(query.skip as string) : 0;
        const limit = query.limit !== undefined ? parseInt(query.limit as string) : 5;
        const getLatestPosts = await GetLatestPostsService(skip, limit);

        return res.status(200).json({
            success: true,
            message:"Fetched Latest Posts Successfully",
            data: getLatestPosts.getLatestPosts,
            totalPosts: getLatestPosts.getTotalPosts
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch posts, try again later"
        });
    }
}


export const GetSinglePostController = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const slug = req.params.slug as string;
        if(!slug){
            return res.status(400).json({
                success: false,
                message:"No slug provided"
            });
        }
        const result = await GetSinglePostService(slug);
        if(!result){
            return res.status(400).json({
                success: false,
                message:"Slug doesn't exist or is invalid"
            });
        }
        return res.status(200).json({
            success: true,
            message:"Fetched Post Successfully",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to fetch post, try again later"
        });
    }
}

export const CreatePostController = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const {heading, description, tags} = req.body;
        const user: any = req["user"];
        const image = req["file"];
        let image_url;
        if(image){
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const cldRes = await handleCloudinaryUpload(dataURI);
            image_url = cldRes?.secure_url;
        }

        const userDetails = user["payload"];
        const createPostResult = await CreatePostService({heading, description, image_url, userDetails: userDetails, tags});
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