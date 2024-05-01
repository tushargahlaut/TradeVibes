import { Request, Response } from "express";
import { GetNiftyDataService } from "../services/nifty.service";

export const GetNiftyDataController = async(req:Request, res: Response) => {
    try {
        const getNiftyServiceRes = await GetNiftyDataService();
        return res.status(200).json({
            success:true,
            message:"Fetched",
            data:getNiftyServiceRes
        })
    } catch (error) {
        console.log("Error");
        return res.status(500).json({
            success:false,
            message:"Failed to fetch nifty data"
        });
    }
}