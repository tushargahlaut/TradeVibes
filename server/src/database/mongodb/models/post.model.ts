import { Schema, model } from "mongoose";
import { IComment, IPost } from "../../../interfaces/post.interface";

const commentSchema = new Schema<IComment>({
  text: { type: String, required: true },
  posted_by: { type: String, required: true },
});

const postSchema = new Schema<IPost>({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String }, // You can add other validations or configurations as needed
  comments: [commentSchema],
  likes: { type: Number, default: 0 },
  posted_by: { type: String, required: true },
});

export const PostModel = model<IPost>("Post", postSchema);
