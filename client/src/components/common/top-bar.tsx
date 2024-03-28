import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "./mode-toggle";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { CircleUserRound, LogOut } from "lucide-react";

export function TopBar() {
  return (
    <div className="w-full">
      <Menubar className="w-full border-t-0 border-l-0 border-r-0 border-b rounded-none flex items-center justify-between p-8">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Trade Vibes
        </h3>
        <div className="flex items-center">
          <MenubarMenu>
            <MenubarTrigger>
              <Button variant="outline">
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage alt={mail?.name} /> */}
                  <AvatarFallback className="text-sm">
                    {"Tushar Gahlaut"
                      .split(" ")
                      .map((chunk) => chunk[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline pl-2">
                  {"Tushar Gahlaut".split(" ")[0]}
                </span>
              </Button>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <CircleUserRound />
                <span className="ml-2">Profile</span>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
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
