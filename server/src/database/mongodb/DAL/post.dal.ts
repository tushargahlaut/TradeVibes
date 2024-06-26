import { IPost } from "../../../interfaces/post.interface";
import { handleCloudinaryDelete } from "../../../services/cloudinary.service";
import { PostModel } from "../models/post.model";

export const GetTopPostsDAL = async (): Promise<IPost[]> => {
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
          likesCount: { $size: "$likes" }, // Add a new field with the size of the likes array
        },
      },
      {
        $sort: { likesCount: -1 }, // Sort by likesCount in descending order
      },
      {
        $limit: 5, // Limit the result to 5 posts
      },
    ]);
    return getTop5Posts;
  } catch (error: any) {
    console.log("Error in GetTopPostsDAL", error);
    throw new Error(error?.message);
  }
};

export const GetTotalPostsDAL = async (): Promise<number> => {
  try {
    const totalPosts = await PostModel.countDocuments({});
    return totalPosts;
  } catch (error: any) {
    console.log("Error in GetTopPostsDAL", error);
    throw new Error(error?.message);
  }
};

export const GetSinglePostDAL = async (slug: string) => {
  try {
    const result = await PostModel.findOne({
      slug,
    }).select("-_id -image_id");
    if (!result) {
      return null;
    }
    return result;
  } catch (error: any) {
    console.log("Error in GetSinglePostDAL", error);
    throw new Error(error?.message);
  }
};

export const LikePostDAL = async (slug: string, email: string) => {
  try {
    const postFind = await PostModel.findOne({
      slug,
    });

    if (!postFind) {
      return null;
    }

    let operation = "";

    const emailIndex = postFind.likes.findIndex(
      (like) => like.made_by === email
    );
    if (emailIndex === -1) {
      postFind.likes.push({ made_by: email });
      postFind.likesCount++;
      operation = "add";
    } else {
      postFind.likes.splice(emailIndex, 1);
      postFind.likesCount--;
      operation = "rem";
    }
    await postFind.save();
    return operation;
  } catch (error: any) {
    console.log("Error in LikePostDAL", error);
    throw new Error(error?.message);
  }
};



export const CommentPostDAL = async(text: string, name: string, email:string, slug: string) =>{
  try {
    const postFind = await PostModel.findOne({
      slug,
    });
    if(!postFind){
      return null;
    }
    postFind.comments.push({
      text, author_name: name, author_email: email
    });
    postFind.commentsCount = postFind.comments.length;
    await postFind.save();
    return postFind
  } catch (error: any) {
    console.log("Error in LikePostDAL", error);
    throw new Error(error?.message);
  }
}


export const GetLatestPostsDAL = async (
  skip: number,
  limit: number
): Promise<IPost[]> => {
  try {
    const getLatestPosts = await PostModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-_id -__v -comments -image_id -likes");
    return getLatestPosts;
  } catch (error: any) {
    console.log("Error in GetTopPostsDAL", error);
    throw new Error(error?.message);
  }
};

export const CreatePostDAL = async (payload: any) => {
  try {
    const createdPost = await PostModel.create(payload);
    return createdPost;
  } catch (error: any) {
    console.log("Error in GetTopPostsDAL", error);
    throw new Error(error?.message);
  }
};


export const DeletePostDAL = async(slug: string, email: string) => {
  try {
    const postFind = await PostModel.findOne({
      slug
    });
    if(!postFind){
      return null;
    }
    if(email!==postFind.author_email){
      throw new Error("mismatch");
    }
    if(postFind.image_url && postFind.image_id){
      handleCloudinaryDelete(postFind.image_id);
    }
    const deletePost = await postFind.deleteOne();
    return deletePost;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
