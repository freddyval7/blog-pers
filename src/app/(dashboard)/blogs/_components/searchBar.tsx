"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SearchIcon, SendHorizonal } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { RefObject, useState } from "react";

export default function SearchBar({
  closeRef,
}: {
  closeRef?: RefObject<HTMLButtonElement>;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  function handleSearch() {
    const params = new URLSearchParams();
    params.append("search", searchValue);
    const url = `/blogs?${params.toString()}`;
    closeRef?.current?.click();
    router.push(url);
  }

  return (
    <div className="relative">
      <Input
        defaultValue={searchParams.get("search") || ""}
        onFocus={() => setIsActive(true)}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search blog..."
      />
      <SearchIcon
        className={cn(
          "text-muted-foreground w-4 h-4 absolute right-3 top-3",
          isActive ? "hidden" : "block"
        )}
      />
      <SendHorizonal
        onClick={() => handleSearch()}
        className={cn(
          "text-muted-foreground w-4 h-4 absolute right-3 top-3 cursor-pointer",
          isActive ? "block" : "hidden"
        )}
      />
    </div>
  );
}
