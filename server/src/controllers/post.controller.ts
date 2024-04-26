import { Request, Response } from "express";
import { CreatePostService, GetTop5PostsService } from "../services/post.service";
import cloudinary from "../services/cloudinary.service";
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
        console.log("Query -->", query);
        // const getLatestPosts = await GetLatestPostsService();

        return res.status(200).json({
            success: true,
            message:"Fetched Latest Posts Successfully",
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
        const {heading, description, tags} = req.body;
        const user: any = req["user"];
        const image = req["file"];
        let image_url;
        if(image){
            console.log("Inside Image");
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