import { useUserStore } from "@/store/user.store";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

import {
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
  } from "@/components/ui/menubar";
  import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { CircleUserRound, LogOut } from "lucide-react";


export function TopBarProfile(){
  

    const { name, logoutUser } = useUserStore();
  const navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.removeItem("accessToken");
    logoutUser();
    navigate("/");
  };
    return(
        <div className="flex items-center">
        <Button onClick={()=>{navigate("/posts")}} className="mx-4" variant={"outline"}>
          Posts
        </Button>
        <Button onClick={()=>{navigate("/nifty")}} variant={"outline"}>Nifty 50</Button>
        <MenubarMenu>
          <MenubarTrigger>
            <Avatar className="h-8 w-8">
              {/* <AvatarImage alt={mail?.name} /> */}
              <AvatarFallback className="text-sm">
                {name
                  .split(" ")
                  .map((chunk) => chunk[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="hidden md:inline pl-2">
              {name.split(" ")[0]}
            </span>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <CircleUserRound />
              <span className="ml-2">Profile</span>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={handleLogOut}>
              <LogOut />
              <span className="ml-2">Log Out</span>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <ModeToggle />
        </MenubarMenu>
      </div>
    )
}