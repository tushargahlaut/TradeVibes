import { Schema, model } from "mongoose";
import { IComment, IPost } from "../../../interfaces/post.interface";

const commentSchema = new Schema<IComment>({
  text: { type: String, required: true },
  posted_by: { type: String, required: true },
});

const postSchema = new Schema<IPost>({
  heading: { type: String, required: true },
  description: { type: String, required: true },
  image_url: { type: String },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  likes: { type: Number, default: 0 },
  posted_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const PostModel = model<IPost>("Post", postSchema);
