import { Request, Response } from "express";
import { CommentPostService, CreatePostService, DeletePostService, GetLatestPostsService, GetSinglePostService, GetTop5PostsService, LikePostService } from "../services/post.service";
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
                message:"Post Not Found",
                data: null
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


export const LikePostController = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const {slug} = req.body;
        const user: any = req["user"];
        const email = user.payload.email
        const handleLike = await LikePostService(slug, email);
        if(!handleLike){
            return res.status(400).json({
                success: false,
                message:"Post Not Found",
                data: null
            });
        }
        return res.status(200).json({
            success:true,
            data: handleLike
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to like this post, try again later"
        });
    }
}


export const CommentPostController = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const {text, slug} = req.body;
        const user: any = req["user"];
        const {name, email} = user.payload;
        const result = await CommentPostService(text, name, email, slug);

        return res.status(200).json({
            success: true,
            message:"Added comment successfully",
            data: result
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to like this post, try again later"
        });
    }
}


export const CreatePostController = async(req: Request, res: Response): Promise<Response> =>{
    try {
        const {heading, description, tags} = req.body;
        const user: any = req["user"];
        const image = req["file"];
        let image_url, image_public_id;
        if(image){
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const cldRes = await handleCloudinaryUpload(dataURI);
            image_url = cldRes?.secure_url;
            image_public_id = cldRes?.public_id;
        }

        const userDetails = user["payload"];
        const createPostResult = await CreatePostService({heading, description, image_url, image_public_id, userDetails: userDetails, tags});
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



export const DeletePostController = async(req:Request, res:Response): Promise<Response> =>{
    try {
        const slug = req.query.slug as string;
        if(!slug){
            return res.status(400).json({
                success:false,
                message:"No slug sent"
            });
        }

        const userDetails:any = req["user"];
        const {email} = userDetails["payload"];

        const deleteService = await DeletePostService(slug, email);

        if(deleteService==null){
            return res.status(400).json({
                success:false,
                message:"No slug sent"
            });
        }

        return res.status(200).json({
            success: true
        });
    } catch (error: any) {
        if(error?.message=="mismatch"){
            return res.status(403).json({
                success:false,
                message:"Unauthorized User"
            });
        }
        return res.status(500).json({
            success:false,
            message:"Failed to delete post, try again later"
        });
    }
}