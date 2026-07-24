"use client";

import { useState, useEffect } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PanelRightOpen, X } from "lucide-react";
import RealtimeInterface from "./RealtimeInterface";
import { useOnboardingStore } from "@/stores/onboardingStore";

const MobileView = () => {
  const [open, setOpen] = useState(false);

  const isComplete = useOnboardingStore((state) => state.isComplete);

  useEffect(() => {
    if (isComplete) {
      setOpen(true);
    }
  }, [isComplete]);

  return (
    <div className="md:hidden">
      <Tooltip>
        <TooltipTrigger
          asChild
          className="absolute top-7 right-5 cursor-pointer bg-primary-purple text-white rounded-full p-3 shadow-md hover:opacity-90 transition-opacity"
        >
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open Zenix Insights"
          >
            <PanelRightOpen className="w-5 h-5" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>See what Zenix is learning here.</p>
        </TooltipContent>
      </Tooltip>

      <Drawer
        open={open || isComplete}
        onOpenChange={setOpen}
        direction="right"
      >
        <DrawerContent className="fixed inset-y-0 right-0 z-50 h-full w-[85vw] max-w-sm flex flex-col rounded-l-xl rounded-r-none backdrop-blur-3xl bg-transparent">
          <div>
            {" "}
            <RealtimeInterface />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileView;
