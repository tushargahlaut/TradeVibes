import { Document } from "mongoose";
import { IUser } from "./user.interface";

export interface IComment {
  text: string;
  author_email: string;
  author_name: string;
}

export interface ILikes{
  index: number;
  made_by: string;
}

export interface IPost extends Document {
  heading: string;
  slug: string;
  description: string;
  image_url?: string; 
  comments: IComment[];
  likes: ILikes[];
  likesCount: number;
  posted_by: IUser;
}



