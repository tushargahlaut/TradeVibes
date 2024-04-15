import { Request, Response } from "express";
import { GetTop5PostsService } from "../services/post.service";

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