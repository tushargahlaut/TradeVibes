import { truncateString } from "@/utils/sm.util";
import { IPost } from "./posts";
import { Heart, MessageSquareText } from "lucide-react";

interface PostProps {
    post: IPost;
  }

export function Post({post}: PostProps) {
  return (
    <div className="h-full w-full md:h-3/4 md:w-3/4 bg-secondary p-4 m-3 rounded-md cursor-pointer">
       <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{post.heading}</h4>
        <p>{truncateString(post.description)}</p>
        <div className="flex mt-2">
          <span className="flex rounded-full py-2 px-1">
            <Heart />
            <p className="ml-2">{post.likesCount}</p>
          </span>
          <span className="flex ml-2 rounded-full py-2 px-1">
            <MessageSquareText />
            <p className="ml-2">{post.likesCount}</p>
          </span>
        </div>
    </div>
  );
}
