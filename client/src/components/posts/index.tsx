import { CreatePost } from "./create-post";
import { Posts } from "./posts";

export function PostsPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <CreatePost/>
      <Posts/>
    </div>
  );
}
