import { GetTopPostsDAL } from "../database/mongodb/DAL/post.dal";
import { IPost } from "../interfaces/post.interface";


export const GetTop5PostsService = async(): Promise<IPost[]> =>{
    try {
        const getTop5PostsServiceResult = await GetTopPostsDAL();
        return getTop5PostsServiceResult;
    } catch (error: any) {
        console.log("Error in GetTop5PostsService", error);
        throw new Error(error?.message)
    }
}