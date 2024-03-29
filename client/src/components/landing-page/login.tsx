import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import GoogleIcon from "@/assets/google-icon.svg";

export function LoginComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Pedro Duarte" />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="@peduarte" />
        </div>
      </CardContent>
      <CardFooter className="w-full grid grid-cols-1 gap-3">
        <Button>
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
        <p className="text-sm text-muted-foreground">New Here? Signup!</p>
      </CardFooter>
    </Card>
  );
}
