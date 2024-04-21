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
import { Button } from "../ui/button";
import { MessageCircleMore } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ExtAxios from "@/utils/axios";
import { AxiosError } from "axios";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  heading: z
    .string()
    .refine(
      (value) => /^[A-Za-z\s'\d\-.,!?()"[\]']+$/.test(value ?? ""),
      "Please Enter a Valid Heading"
    ),
  description: z.string(),
  image: z.any()
  .refine(files => {return Array.from(files).every(file => file instanceof File)}, { message: "Expected a file" })
  .refine(files => Array.from(files).every((file: any) => ACCEPTED_IMAGE_TYPES.includes(file?.type)), "Only these types are allowed .jpg, .jpeg, .png and .webp")
});

export function CreatePost() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      description: "",
      image: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        console.log("Form Values", values);
        const formData = new FormData();
        formData.append('heading', values.heading);
        formData.append('description', values.description);
        formData.append('image', values.image);
        const submitPost = await ExtAxios.post("api/v1/post", formData,{
          headers:{
            'Content-Type': 'multipart/form-data',
          }
        });
        console.log("Submit Post", submitPost);
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

  return (
    <Dialog>
      <DialogTrigger className="w-full my-4">
        <Button variant="secondary" className="w-1/3">
          <MessageCircleMore className="text-xs mr-2" />{" "}
          <span>Got Something on your mind? </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Post</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="heading"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="my-2"
                        placeholder="Heading"
                        {...field}
                      />
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
              <FormField
                control={form.control}
                name="image"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Picture</FormLabel>
                    <FormControl>
                      <Input
                        {...fieldProps}
                        placeholder="Picture"
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          onChange(event.target.files && event.target.files[0])
                        }
                          
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="w-full my-2"
                variant={"secondary"}
                type="submit"
              >
                <span className="font-semibold">Submit</span>
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
