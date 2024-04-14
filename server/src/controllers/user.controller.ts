import { UserModel } from "../database/mongodb/models/user.model";
import { Request, Response } from "express";

export const DeleteUserController = async(req:Request, res:Response): Promise<Response> =>{
    try {
      const deletedUser = await UserModel.deleteOne({
        email:"yedarkness25@gmail.com"
      })
      return res.status(200).json({
        "success":"Deleted"
      });
    } catch (error: any) {
      console.log("Error", error?.message);
      return res.status(500).json({
        success: false,
        message:"Failed to delete the user",
      })
    }
  }