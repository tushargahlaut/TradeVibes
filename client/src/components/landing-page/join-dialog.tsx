import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginComponent } from "./login";

export function JoinDialog() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
            variant="ghost"
          >
            Join Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[430px]">
          <Tabs defaultValue="login" className="w-full m-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Signup</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginComponent />
            </TabsContent>
            <TabsContent value="signup">Change your password here.</TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
