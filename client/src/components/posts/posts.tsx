
import { BaseAxios } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";

interface ILike{
  made_by: string;
}

interface IComment{
  text: string;
  author_name: string;
}

interface IPost {
  heading: string;
  slug: string;
  description: string;
  image_url: string;
  author_name: string;
  posted_by: string;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}


export function Posts() {
  const { toast } = useToast();
  const [posts, setPosts] = useState<IPost[] | null>();
  const [page, setPage] = useState(1);
  const limit = 5;
  const skip = (page-1)*limit;

  async function fetchPosts() {
    try {
      const getPosts = await BaseAxios.get("/api/v1/post", {
        params: {
          skip,
          limit,
        },
      });
      console.log("Get Posts", getPosts);
      setPosts(getPosts.data.data);
      toast({
        title: getPosts.data.message,
      });
    } catch (error: any) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          title:
            "Uh oh! Something went wrong." +
            ` (Error: ${error?.response?.status})`,
          description: `${error.response?.data?.message}`,
        });
      }
      console.log("Something Went Wrong in Signup", error);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div>
      
    </div>
  );
}
