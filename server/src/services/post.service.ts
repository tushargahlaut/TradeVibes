import { CreatePostDAL, GetLatestPostsDAL, GetTopPostsDAL, GetTotalPostsDAL } from "../database/mongodb/DAL/post.dal";
import { IPost } from "../interfaces/post.interface";
import { decryptString } from "../utils/crypto.util";
import { SlugifyString } from "../utils/slugify.util";


export const GetTop5PostsService = async(): Promise<IPost[]> =>{
    try {
        const getTop5PostsServiceResult = await GetTopPostsDAL();
        return getTop5PostsServiceResult;
    } catch (error: any) {
        console.log("Error in GetTop5PostsService", error);
        throw new Error(error?.message)
    }
}

export const GetLatestPostsService = async(skip: number, limit: number) => {
    try {
        const getLatestPosts = await GetLatestPostsDAL(skip, limit);
        const getTotalPosts = await GetTotalPostsDAL();

        return {getLatestPosts, getTotalPosts};
    } catch (error: any) {
        console.log("Error in GetLatestPostsService", error);
        throw new Error(error?.message)
    }
}

export const CreatePostService = async(payload: any) =>{
    try {
        const pheading: string = payload.heading || "test";
        const pslug = SlugifyString(pheading);
        const pauthor_name: string = payload.userDetails.name;
        const decryptedString = decryptString(payload.userDetails.user_id);
        const posted_by = {"name": payload.userDetails.name, "email": payload.userDetails.email, "_id": decryptedString };
        const pimage_url = payload.image_url || "";
        const createdPost = await CreatePostDAL({heading: pheading, description:payload.description, author_name: pauthor_name, slug: pslug, posted_by, image_url: pimage_url});

        //This is the data I am returning.
        const {heading, slug, description, image_url, author_name, likesCount, comments, likes} = createdPost;
        return {heading, slug, description, image_url, author_name, likesCount, comments, likes};
    } catch (error: any) {
        console.log("Error in CreatePostService", error);
        throw new Error(error?.message)
    }
}