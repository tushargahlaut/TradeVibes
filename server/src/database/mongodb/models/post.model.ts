import { Schema, model } from "mongoose";
import { IComment, IPost, ILikes } from "../../../interfaces/post.interface";


const CommentSchema = new Schema<IComment>({
  text: { type: String, required: true },
  author_email: { type: String, required: true },
  author_name: { type: String, required: true }
});

const LikesSchema = new Schema<ILikes>({
  index: { type: Number, required: true },
  made_by: { type: String, required: true }
});

const postSchema = new Schema<IPost>({
  heading: { type: String, required: true },
  slug: {type: String, required: true},
  description: { type: String, required: true },
  image_url: { type: String },
  comments: [CommentSchema],
  likes: [LikesSchema],
  posted_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const PostModel = model<IPost>("Post", postSchema);
