import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
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
import { Button } from "../ui/button";
import { useState } from "react";

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
  image: z
    .any()
    .refine(
      (files) => {
        return Array.from(files).every((file) => file instanceof File);
      },
      { message: "Expected a file" }
    )
    .refine(
      (files) =>
        Array.from(files).every((file: any) =>
          ACCEPTED_IMAGE_TYPES.includes(file?.type)
        ),
      "Only these types are allowed .jpg, .jpeg, .png and .webp"
    ).nullable()
});

interface CreatePostFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreatePostForm({setOpen}: CreatePostFormProps) {
  const { toast } = useToast();
  const [disabled, setDisabled] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heading: "",
      description: "",
      image: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setDisabled(true)
    try {
     
      console.log("Form Values", values);
      const formData = new FormData();
      formData.append("heading", values.heading);
      formData.append("description", values.description);
      formData.append("image", values.image);
      const submitPost = await ExtAxios.post("api/v1/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast({
        title: "Posted Successfully!",
      })
      setOpen(false);
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
  return (
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
                    onChange(event.target.files && event.target.files[0]);
                  }}
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
  );
}
