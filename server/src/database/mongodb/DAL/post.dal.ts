import { IPost } from "../../../interfaces/post.interface";
import { PostModel } from "../models/post.model";


export const GetTopPostsDAL = async(): Promise<IPost[]> => {
    try {
        const getTop5Posts = await PostModel.find();
        return getTop5Posts;
    } catch (error: any) {
        console.log("Error in GetTopPostsDAL", error);
        throw new Error(error?.message)
    }
}