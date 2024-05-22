import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import ExtAxios from "@/utils/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import { Pencil } from "lucide-react";
import { EditDeletePostProps } from "./edit-delete";
  
  const formSchema = z.object({
    heading: z
      .string()
      .refine(
        (value) => /^[A-Za-z\s'\d\-.,!?()"[\]']+$/.test(value ?? ""),
        "Please Enter a Valid Heading"
      ),
    description: z.string(),
  });
  

interface EditPostFormProps extends EditDeletePostProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


function EditPostForm({post, setOpen}:EditPostFormProps){


    const { toast } = useToast();
    const [disabled, setDisabled] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        heading: post?.heading || "",
        description: post?.description || "",
      },
    });
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
      setDisabled(true)
      try {
       
        console.log("Form Values", values);
        const formData = new FormData();
        formData.append("heading", values.heading);
        formData.append("description", values.description);
        await ExtAxios.put("api/v1/post", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast({
          title: "Updated Successfully!",
        })
        setOpen(false);
        window.location.reload();
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
      setDisabled(false)
    }

    return(
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="heading"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="my-2" placeholder="Heading" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                 
                  <Textarea
                    className="my-2"
                    placeholder="Description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={disabled} className="w-full my-2" variant={"secondary"} type="submit">
            <span className="font-semibold">Submit</span>
          </Button>
        </form>
      </Form>
    )
}



export function EditPost({post}: EditDeletePostProps){
    const [open, setOpen] = useState<boolean>(false);
    return(
        <Dialog open={open} onOpenChange={setOpen} >
        <DialogTrigger asChild>
        <div className="flex items-center m-1 cursor-pointer hover:bg-secondary rounded p-1">
              <Pencil />
              <span className="ml-2 sm:hidden md:inline">Edit</span>
            </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <EditPostForm post={post} setOpen={setOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
}