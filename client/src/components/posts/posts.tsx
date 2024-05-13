import { BaseAxios } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";
import { Button } from "../ui/button";
import { Post } from "./post";

// interface ILike {
//   made_by: string;
// }

// interface IComment {
//   text: string;
//   author_name: string;
// }

export interface IPost {
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
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const limit = 1;

  async function fetchPosts(){
    try {
      const skip = (page-1)*limit;
      const getPosts = await BaseAxios.get("/api/v1/post", {
        params: {
          skip,
          limit,
        },
      });
      console.log("Get Posts", getPosts);
      if(getPosts.data.data.length==0){
        setIsFetched(true);
        toast({
          variant: "destructive",
          title:
            "No More Posts to Show. Please Try Again Later"
        });
      
      }
      if(page==1){
        setPosts(getPosts.data.data);
      }
      else{
        setPosts(prevPosts => [...prevPosts, ...getPosts.data.data]);
      }
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
      console.log("Something Went Wrong in Fetch posts", error)
    }
  }

  

  useEffect(() => {
   fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
   }, [page]);

  return (
    <div className="flex h-full w-full flex-col p-3 justify-center items-center">
      {posts?.map((post, index)=>{
        return(
          <Post post={post} key={index}/>
        )
      })}
      <Button
      disabled={isFetched}
        onClick={() => {
         setPage(prev=>prev+1)
        }}
      >
        Load More
      </Button>
    </div>
  );
}
