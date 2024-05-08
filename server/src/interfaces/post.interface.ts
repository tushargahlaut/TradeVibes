import { Document } from "mongoose";
import { IUser } from "./user.interface";

export interface IComment {
  text: string;
  author_name: string;
}

export interface ILikes{
  index: number;
  made_by: string;
}

export interface IPost extends Document {
  heading: string;
  slug: string;
  author_name: string;
  description: string;
  image_url?: string; 
  comments: IComment[];
  commentsCount: number;
  likes: ILikes[];
  likesCount: number;
  posted_by: IUser;
  tags: string[];
}

export interface IPostInput extends Omit<IPost, "comments" | "likes" | "likesCount" | "slug" | "author_name">{};


