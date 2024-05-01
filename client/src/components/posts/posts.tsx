import { BaseAxios } from "@/utils/axios";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { AxiosError } from "axios";

 

export function Posts(){
    const { toast } = useToast();
    const [posts,setPosts] = useState({});
    const [skip, setSkip] = useState(0);
    const limit = 5;

    async function fetchPosts(){
        try {
            const getPosts = await BaseAxios.get("/api/v1/post",{
                params:{
                    skip,
                    limit
                }
            });
            console.log("Get Posts", getPosts);
            setPosts(getPosts.data.data);
            toast({
                title:getPosts.data.message
            })
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
    

    useEffect(()=>{
        fetchPosts();
    }, []);
    return(
        <div>
            <p>Posts Here</p>
        </div>
    )
}