import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AlignJustify } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleUserRound, LogOut } from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { useState } from "react";

function ProfileAccordion() {
  const { name, logoutUser } = useUserStore();
  const navigate = useNavigate();

  const handleLogOut = () => {
    sessionStorage.removeItem("accessToken");
    logoutUser();
    navigate("/");
  };
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-center">
          <span>{name.split(" ")[0]}</span>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col items-center justify-center">
          <div className="flex">
            <CircleUserRound />
            <span className="ml-2">Profile</span>
          </div>
          <div className="flex mt-4" onClick={handleLogOut}>
            <LogOut />
            <span className="ml-2">Log Out</span>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function TopBarDrawer() {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Drawer open={open} onOpenChange={setOpen} direction="right">
      <DrawerTrigger>
        <AlignJustify />
      </DrawerTrigger>
      <DrawerContent className="p-4">
        <div className="flex flex-col">
          <Button onClick={()=>{navigate("/posts"); setOpen(false)}} variant={"ghost"}>
            Posts
          </Button>
          <Button onClick={()=>{navigate("/nifty") ; setOpen(false)}} variant={"ghost"}>Nifty 50</Button>
          <ProfileAccordion />
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
