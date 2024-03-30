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
import GoogleIcon from "@/assets/google-icon.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

interface LoginComponentProps {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const formSchema = z.object({
  email: z
    .string()
    .refine(
      (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value ?? ""),
      "Email is Not Valid"
    ),
  password: z.string().min(3, "Password Should be of at least 3 characters"),
});

export function LoginComponent({ setActiveTab }: LoginComponentProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
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
              <span className="font-semibold">Login</span>
            </Button>
            <Button className="flex items-center justify-center">
              <img
                className="w-4 h-4 object-contain"
                src={GoogleIcon}
                alt="Google Icon"
              />
              <span className="ml-1 font-semibold">Login with Google</span>
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              New Here?{" "}
              <span
                onClick={() => setActiveTab("signup")}
                className="text-white cursor-pointer"
              >
                {" "}
                Signup!
              </span>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
