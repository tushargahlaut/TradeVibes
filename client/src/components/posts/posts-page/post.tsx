import { truncateString } from "@/utils/sm.util";
import { IPost } from "./posts";
import { Heart, Image, MessageSquareText } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PostProps {
  post: IPost;
}

export function Post({ post }: PostProps) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/posts/${post.slug}`)}
      className="h-full w-full md:h-3/4 md:w-3/4 bg-secondary p-4 m-3 rounded-md cursor-pointer"
    >
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
        {post.heading}
      </h4>
      <p>{truncateString(post.description)}</p>
      <div className="flex mt-2">
        <span className="flex rounded-full py-2 px-1">
          <Heart />
          <p className="ml-2">{post.likesCount}</p>
        </span>
        <span className="flex ml-2 rounded-full py-2 px-1">
          <MessageSquareText />
          <p className="ml-2">{post.commentsCount}</p>
        </span>
        {post.image_url && (
          <span className="flex ml-2 rounded-full py-2 px-1">
            <Image />
            <p className="ml-2">Media Available</p>
          </span>
        )}
      </div>
    </div>
  );
}
