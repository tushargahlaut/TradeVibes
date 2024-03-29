import { Document } from "mongoose";
import { IUser } from "./user.interface";

export interface IComment extends Document {
  text: string;
  posted_by: string;
}

export interface IPost extends Document {
  heading: string;
  description: string;
  image_url?: string; //Better to store full image name here.
  comments: IComment[];
  likes: number;
  posted_by: IUser;
}
