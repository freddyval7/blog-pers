"use client";

import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Option } from "lucide-react";
import SearchBar from "./searchBar";
import SortMenu from "./sort";
import { ElementRef, useRef } from "react";

export default function SortMenuMobile() {
  const closeRef = useRef<ElementRef<"button">>(null);

  return (
    <Dialog>
      <DialogTrigger>
        <Option size={24} />
      </DialogTrigger>
      <DialogContent hideCloseButton className="p-4 space-y-6">
        <SearchBar closeRef={closeRef} />
        <SortMenu />
      </DialogContent>
      <DialogClose ref={closeRef} />
    </Dialog>
  );
}
