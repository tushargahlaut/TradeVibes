import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { BaseAxios } from "@/utils/axios";
import { AxiosError } from "axios";

interface SignupComponentProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const formSchema = z.object({
  name: z
    .string()
    .refine(
      (value) => /^[A-Za-z\s'\d-]+$/.test(value ?? ""),
      "Please Enter a Valid Name"
    ),
  email: z
    .string()
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value ?? ""),
      "Please Enter a Valid Email"
    ),
  password: z.string().min(3, "Password Should be of at least 3 characters"),
});

export function SignupComponent({ setActiveTab }: SignupComponentProps) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const signupResult = await BaseAxios.post("/api/v1/auth/register", {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      console.log("Signup Result", signupResult);
      sessionStorage.setItem("accessToken", signupResult?.data?.token);

      toast({
        title: "Congratulations!, Registered Successfully",
        description: signupResult.data?.message,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong." + ` (${error?.status})`,
          description: `${error.response?.data?.message}`,
        });
      }
      console.log("Something Went Wrong", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Try Again Later",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="w-full grid grid-cols-1 gap-3">
            <Button type="submit">
              <span className="font-semibold">Signup</span>
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already Registered?{" "}
              <span
                onClick={() => setActiveTab("login")}
                className="text-white cursor-pointer"
              >
                {" "}
                Login!
              </span>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
