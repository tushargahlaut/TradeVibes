import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { IPostComplete } from "./single-post";
import ExtAxios from "@/utils/axios";


interface EditDeletePostProps{
  post: IPostComplete | null
}

function DeletePost() {
    const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
    const params = useParams();
    const {toast} = useToast();
    const navigate = useNavigate();
    async function deletePost(){
        try {
          const {slug} = params;
          const deletePost = await ExtAxios.delete("/api/v1/post",{
            params:{
              slug
            }
          });
          navigate("/posts");
        } catch (error) {
          if (error instanceof AxiosError) {
            toast({
              variant: "destructive",
              title:
                "Uh oh! Something went wrong." +
                ` (Error: ${error?.response?.status})`,
              description: `${error.response?.data?.message}`,
            });
          }
        }
    }
  return (
    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center m-1 cursor-pointer hover:bg-secondary rounded p-1">
          <Trash2 />
          <span className="sm:hidden md:inline ml-2 ">Delete</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={()=>setDeleteOpen(false)} variant={"secondary"}>Cancel</Button>
          <Button onClick={deletePost} variant="default">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
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
            <div className="flex items-center m-1 cursor-pointer hover:bg-secondary rounded p-1">
              <Pencil />
              <span className="ml-2 sm:hidden md:inline">Edit</span>
            </div>
            <DeletePost />
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
