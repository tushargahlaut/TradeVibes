import { randomUUID } from "crypto";
import {
    CommentPostDAL,
  CreatePostDAL,
  DeletePostDAL,
  GetLatestPostsDAL,
  GetSinglePostDAL,
  GetTopPostsDAL,
  GetTotalPostsDAL,
  LikePostDAL,
} from "../database/mongodb/DAL/post.dal";
import { IPost } from "../interfaces/post.interface";
import { decryptString } from "../utils/crypto.util";
import { SlugifyString } from "../utils/slugify.util";

export const GetTop5PostsService = async (): Promise<IPost[]> => {
  try {
    const getTop5PostsServiceResult = await GetTopPostsDAL();
    return getTop5PostsServiceResult;
  } catch (error: any) {
    console.log("Error in GetTop5PostsService", error);
    throw new Error(error?.message);
  }
};

export const GetSinglePostService = async (
  slug: string
): Promise<IPost | null> => {
  try {
    const GetSinglePostServiceResult = await GetSinglePostDAL(slug);
    return GetSinglePostServiceResult;
  } catch (error: any) {
    console.log("Error in GetTop5PostsService", error);
    throw new Error(error?.message);
  }
};

export const LikePostService = async (slug: string, email: string) => {
  try {
    const result = await LikePostDAL(slug, email);
    return result;
  } catch (error: any) {
    console.log("Error in LikePostService", error);
    throw new Error(error?.message);
  }
};

export const CommentPostService = async (
  text: string,
  name: string,
  email:string,
  slug: string
) => {
  try {
    const result = await CommentPostDAL(text, name, email, slug);
    return result;
  } catch (error: any) {
    console.log("Error in CommentPostService", error);
    throw new Error(error?.message);
  }
};

export const GetLatestPostsService = async (skip: number, limit: number) => {
  try {
    const getLatestPosts = await GetLatestPostsDAL(skip, limit);
    const getTotalPosts = await GetTotalPostsDAL();

    return { getLatestPosts, getTotalPosts };
  } catch (error: any) {
    console.log("Error in GetLatestPostsService", error);
    throw new Error(error?.message);
  }
};

export const CreatePostService = async (payload: any) => {
  try {
    const pheading: string = payload.heading || "test";
    const pslug = SlugifyString(pheading);
    const pauthor_name: string = payload.userDetails.name;
    const pauthor_email: string = payload.userDetails.email;
    const decryptedString = decryptString(payload.userDetails.user_id);
    const posted_by = {
      name: payload.userDetails.name,
      email: payload.userDetails.email,
      _id: decryptedString,
    };
    const pimage_url = payload.image_url || "";
    const createdPost = await CreatePostDAL({
      heading: pheading,
      description: payload.description,
      author_name: pauthor_name,
      author_email:pauthor_email,
      slug: pslug,
      posted_by,
      image_url: pimage_url,
    });

    //This is the data I am returning.
    const {
      heading,
      slug,
      description,
      image_url,
      author_name,
      likesCount,
      comments,
      likes,
    } = createdPost;

    return {
      heading,
      slug,
      description,
      image_url,
      author_name,
      likesCount,
      comments,
      likes,
    };
  } catch (error: any) {
    console.log("Error in CreatePostService", error);
    throw new Error(error?.message);
  }
};

export const DeletePostService = async(slug: string, email: string) =>{
  try {
    const deleteResult = await DeletePostDAL(slug, email);
    return deleteResult;
  } catch (error: any) {
    console.log("Error in DeletePostService", error);
    throw new Error(error?.message);
  }
}
