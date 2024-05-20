import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { GripVertical, Pencil, Trash2 } from "lucide-react";

export function EditDeletePost() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <GripVertical />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="flex items-center m-1 cursor-pointer hover:bg-secondary rounded p-2">
              <Pencil />
              <span className="ml-2 sm:hidden md:inline">Edit</span>
            </div>
            <div className="flex items-center m-1 cursor-pointer hover:bg-secondary rounded p-2">
              <Trash2 />
              <span className="ml-2 sm:hidden md:inline">Delete</span>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
