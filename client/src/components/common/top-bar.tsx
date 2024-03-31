import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { CircleUserRound, LogOut } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { useNavigate } from "react-router-dom";

export function TopBar() {
  const { name, logoutUser } = useUserStore();
  const navigate = useNavigate();
  const handleLogOut = () => {
    sessionStorage.removeItem("accessToken");
    logoutUser();
    navigate("/");
  };
  return (
    <div className="w-full">
      <Menubar className="w-full border-t-0 border-l-0 border-r-0 border-b rounded-none flex items-center justify-between p-8">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Trade Vibes
        </h3>
        <div className="flex items-center">
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
      </Menubar>
    </div>
  );
}
