import { IPost } from "../../../interfaces/post.interface";
import { PostModel } from "../models/post.model";


export const GetTopPostsDAL = async(): Promise<IPost[]> => {
    try {
        const getTop5Posts = await PostModel.aggregate([
            {
                $project: {
                  heading: 1,
                  slug: 1,
                  description: 1,
                  image_url: 1,
                  posted_by: 1,
                  comments: 1,
                  likes: 1,
                  likesCount: { $size: "$likes" } // Add a new field with the size of the likes array
                }
              },
              {
                $sort: { likesCount: -1 } // Sort by likesCount in descending order
              },
              {
                $limit: 5 // Limit the result to 5 posts
              }
        ]);
        return getTop5Posts;
    } catch (error: any) {
        console.log("Error in GetTopPostsDAL", error);
        throw new Error(error?.message)
    }
}

export const CreatePostDAL = async(payload: any) =>{
    try {
        return "Placeholder";
    } catch (error: any) {
        console.log("Error in GetTopPostsDAL", error);
        throw new Error(error?.message)
    }
}