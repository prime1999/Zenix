"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PanelRightOpen, X } from "lucide-react";
import RealtimeInterface from "./RealtimeInterface";

const MobileView = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Tooltip>
        <TooltipTrigger
          asChild
          className="absolute top-7 right-5 cursor-pointer bg-primary-purple text-white rounded-full p-3 shadow-md hover:opacity-90 transition-opacity"
          onClick={() => setOpen(true)}
        >
          <button type="button" aria-label="Open Zenix Insights">
            <PanelRightOpen className="w-5 h-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>See what Zenix is learning here.</p>
        </TooltipContent>
      </Tooltip>

      <Drawer open={open} onOpenChange={setOpen} direction="right">
        <DrawerContent className="fixed inset-y-0 right-0 z-50 h-full w-[85vw] max-w-sm flex flex-col rounded-l-xl rounded-r-none backdrop-blur-3xl bg-transparent">
          <div>
            {" "}
            <RealtimeInterface />
          </div>

          {/* <DrawerFooter className="pt-2 border-t px-4 pb-4">
            <DrawerClose className="w-full py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80 transition-colors">
              continue
            </DrawerClose>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileView;
