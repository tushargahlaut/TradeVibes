import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
import { Comment } from "./single-post";





interface CommentProps {
    comments: Comment[] | undefined
}



const FormSchema = z.object({
    comment: z.string().min(2, {
      message: "Comment Should be at least 2 characters long",
    }),
  })


function AddComment(){
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
          comment: "",
        },
      })


      async  function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
          ),
        })
      }


    return(
        <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex items-center justify-center">
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
          <Button className="ml-2" type="submit">Submit</Button>
        </form>
      </Form>
    )
}

export function Comments({comments}: CommentProps) {
  return (
    <Card className="my-3 w-3/4">
      <CardContent className="p-3">
        <div className="w-full flex flex-col items-center justify-center">
        <AddComment/>
        </div>
        {comments?.map((comment) =>{
            return(
                <div key={comment.id}>
                    Comments GO HERE
                </div>
            )
        } )}
      </CardContent>
    </Card>
  );
}
