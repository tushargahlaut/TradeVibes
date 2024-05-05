import {
  Menubar,
} from "@/components/ui/menubar";

import { useMediaQuery } from "usehooks-ts";
import { TopBarDrawer } from "./top-bar-drawer";
import { TopBarProfile } from "./top-bar-profile";

export function TopBar() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  return (
    <div className="w-full">
      <Menubar className="w-full border-t-0 border-l-0 border-r-0 border-b rounded-none flex items-center justify-between p-8">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Trade Vibes
        </h3>

        {isMobile ? (
          <TopBarDrawer />
        ) : (
          <TopBarProfile/>
        )}
     </Menubar>
    </div>
  );
}
