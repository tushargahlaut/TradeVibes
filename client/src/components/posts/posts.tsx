import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { BaseAxios } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";

export function Posts() {
  const { toast } = useToast();
  const [posts, setPosts] = useState({});
  const [page, setPage] = useState(1);
  const limit = 5;
  const skip = (page-1)*limit;
  let totalPages = 0;

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
      totalPages = getPosts.data.totalPosts;
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
      <Pagination>
        <PaginationContent>
           {page > 1  && <PaginationItem>
            <PaginationPrevious onClick={()=>{
                setPage((prev)=>prev-1)
            }} />
          </PaginationItem>} 
          
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          {(totalPages - page) > 2 && <PaginationItem>
            <PaginationNext onClick={()=>{
                setPage((prev)=>prev+1)
            }} />
          </PaginationItem>}
          
        </PaginationContent>
      </Pagination>
    </div>
  );
}
