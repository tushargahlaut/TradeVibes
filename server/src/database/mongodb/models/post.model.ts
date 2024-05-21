import { Schema, model } from "mongoose";
import { IPost } from "../../../interfaces/post.interface";
import { randomUUID } from "crypto";

const postSchema = new Schema<IPost>(
  {
    heading: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    image_url: { type: String },
    author_name: { type: String },
    posted_by: { type: Schema.Types.ObjectId, ref: "User", required: true },
    comments: [
      {
        id: {
          type: String,
          required: true,
          default: randomUUID(),
        },
        text: { type: String, required: true },
        author_name: { type: String, required: true },
      },
    ],
    commentsCount: {
      type: Number,
      required: true,
      default: 0,
    },
    author_email: {
      type: String,
      required: true,
    },
    image_id: {
      type: String,
    },
    likesCount: {
      type: Number,
      required: true,
      default: 0,
    },
    likes: [
      {
        made_by: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const PostModel = model<IPost>("Post", postSchema);
