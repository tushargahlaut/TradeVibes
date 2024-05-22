import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { GripVertical } from "lucide-react";
import { IPostComplete } from "./single-post";
import { DeletePost } from "./delete-post";
import { EditPost } from "./edit-post";


export interface EditDeletePostProps{
  post: IPostComplete | null
}



export function EditDeletePost({post}: EditDeletePostProps) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <GripVertical />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-2">
            <EditPost post={post} />
            <DeletePost />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
