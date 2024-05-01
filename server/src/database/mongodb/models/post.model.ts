import { Schema, model } from "mongoose";
import { IPost } from "../../../interfaces/post.interface";

const postSchema = new Schema<IPost>({
  heading: { type: String, required: true },
  slug: {type: String, required: true},
  description: { type: String, required: true },
  image_url: { type: String },
  author_name: { type: String },
  posted_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
  comments: [{ 
    text: { type: String, required: true },
    author_name: { type: String, required: true }
  }],
  likesCount:{
    type: Number,
    required: true,
    default: 0
  },
  likes: [{ 
    index: { type: Number, required: true },
    made_by: { type: String, required: true }
  }]
},
{
  timestamps: true
});

export const PostModel = model<IPost>("Post", postSchema);
