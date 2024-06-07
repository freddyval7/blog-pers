"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { RefObject, useState } from "react";

export default function SortMenu({closeRef}: {closeRef?: RefObject<HTMLButtonElement>}) {
  const router = useRouter();
  const [order, setOrder] = useState("");
  const [date, setDate] = useState("");

  function handleSorting() {
    const params = new URLSearchParams();
    if (order !== "") params.append("order", order);
    //if (date !== "") params.append("date", date);
    const url = `/blogs?${params.toString()}`;
    closeRef?.current?.click();
    router.push(url);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-center font-bold">Sort by</h2>
      <div>
        <Select onValueChange={(e) => setOrder(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Alphabetical" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">A-Z</SelectItem>
            <SelectItem value="desc">Z-A</SelectItem>
          </SelectContent>
        </Select>
        {/* <Select onValueChange={(e) => setDate(e)}>
          <SelectTrigger>
            <SelectValue placeholder="Date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
      <Button className="w-full" onClick={handleSorting} variant="main">
        Sort
      </Button>
    </div>
  );
}
