import { useParams } from "react-router-dom"
import { useToast } from "../ui/use-toast";
import { BaseAxios } from "@/utils/axios";
import { AxiosError } from "axios";
import { useEffect } from "react";

export function SinglePost(){
    const params = useParams();
  const { toast } = useToast();

    async function fetchPost(){
        try {
            const query = await BaseAxios.get(`/api/v1/post/${params.slug}`);
            console.log("Query-->", query);
        } catch (error) {
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

    useEffect(()=>{
        fetchPost()
    },[])
    return(
        <div>
            <p>Single Posts Go Here</p>
        </div>
    )
}