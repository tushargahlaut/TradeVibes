import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Comment } from "./single-post";
import { AxiosError } from "axios";
import ExtAxios from "@/utils/axios";
import { useParams } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface CommentProps {
  comments: Comment[] | undefined;
}

const FormSchema = z.object({
  comment: z.string().min(2, {
    message: "Comment Should be at least 2 characters long",
  }),
});

function AddComment() {
  const params = useParams();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { slug } = params;
    try {
      const addComment = await ExtAxios.post("api/v1/post/comment", {
        text: data.comment,
        slug,
      });
      console.log("AddComment", addComment);
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex items-center justify-center"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Add Comment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="ml-2" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export function Comments({ comments }: CommentProps) {
  return (
    <Card className="my-3 w-3/4">
      <CardContent className="p-3">
        <div className="w-full flex flex-col items-center justify-center">
          <AddComment />
        </div>
        {comments?.map((comment) => {
          return (
            <div className="flex items-center my-2 p-3" key={comment._id}>
              <div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-sm">
                    {comment.author_name
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col ml-4">
                <p className="text-lg font-semibold">{comment.author_name}</p>
                <p>{comment.text}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
