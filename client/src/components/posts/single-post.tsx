import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../ui/use-toast";
import ExtAxios, { BaseAxios } from "@/utils/axios";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IPost } from "./posts";
import { Heart, MessageSquareText } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { useTheme } from "../common/theme-provider";
import { Comments } from "./comments";

interface Like {
  made_by: string;
}

export interface Comment {
  id: string;
  text: string;
  author_name: string;
}

interface IPostComplete extends IPost {
  likes: Like[];
  comment: Comment[];
}

export function SinglePost() {
  const params = useParams();
  const { theme } = useTheme();
  const [post, setPost] = useState<IPostComplete | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const { email } = useUserStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  async function fetchPost() {
    try {
      const { data } = await BaseAxios.get(`/api/v1/post/${params.slug}`);
      if (data.data == null) {
        throw new AxiosError("Post Doesn't Exists");
      }
      setPost(data.data);
      if (post?.likes.some((like) => like.made_by == email)) {
        setIsLiked(true);
      }
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
      setTimeout(() => {
        navigate("/posts");
      }, 3000);
    }
  }

  async function handleLikeClick() {
    try {
      const { slug } = params;
      const { data } = await ExtAxios.post("/api/v1/post/like", {
        slug,
      });

      if (data.data == null) {
        throw new AxiosError("Couldn't Like the Post");
      } else if (data.data == "add") {
        let newPost: IPostComplete | null = post;
        if (newPost) {
          newPost?.likes.push({
            made_by: email,
          });
          newPost.likesCount = (newPost.likesCount || 0) + 1;
          setPost({ ...newPost });
          setIsLiked(true);
        }
      } else if (data.data == "rem") {
        let newPost = post;
        if (newPost) {
          newPost?.likes.filter((like) => like.made_by != email);
          newPost.likesCount = (newPost.likesCount || 0) - 1;
          setPost({ ...newPost });
        }
        setIsLiked(false);
      }
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
    }
  }

  useEffect(() => {
    fetchPost();
  }, []);
  return (
    <div className="p-3 flex flex-col justify-center items-center">
      <Card className="w-full md:w-3/4">
        <CardHeader>
          <CardTitle>{post?.heading}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{post?.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex flex-col justify-start items-start">
          {post?.image_url && <img src={post.image_url} alt="Post Image" />}
          <div className="flex m-3">
            <span
              onClick={handleLikeClick}
              className="flex rounded-full py-2 px-1 cursor-pointer hover:bg-secondary"
            >
              <Heart
                fill={isLiked ? (theme === "dark" ? "#fff" : "#000") : "none"}
              />
              <p className="ml-2">{post?.likesCount}</p>
            </span>
            <span className="flex ml-2 rounded-full py-2 px-1">
              <MessageSquareText />
              <p className="ml-2">{post?.commentsCount}</p>
            </span>
          </div>
        </CardFooter>
      </Card>
      <Comments comments={post?.comment} />
    </div>
  );
}
