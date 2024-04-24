import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { MessageCircleMore } from "lucide-react";

import { CreatePostForm } from "./create-post-form";

export function CreatePost() {
 

  return (
    <Dialog>
      <DialogTrigger className="w-full my-4">
        <Button variant="secondary" className="w-1/3">
          <MessageCircleMore className="text-xs mr-2" />{" "}
          <span>Got Something on your mind? </span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new Post</DialogTitle>
          <CreatePostForm/>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
