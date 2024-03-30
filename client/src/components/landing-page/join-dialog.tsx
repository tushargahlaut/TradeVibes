import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginComponent } from "./login";
import { useState } from "react";
import { SignupComponent } from "./signup";

export function JoinDialog() {
  const [activeTab, setActiveTab] = useState<string>("login");
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
          <Tabs value={activeTab} className="w-full m-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger onClick={() => setActiveTab("login")} value="login">
                Login
              </TabsTrigger>
              <TabsTrigger
                onClick={() => setActiveTab("signup")}
                value="signup"
              >
                Signup
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginComponent setActiveTab={setActiveTab} />
            </TabsContent>
            <TabsContent value="signup">
              <SignupComponent setActiveTab={setActiveTab} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
