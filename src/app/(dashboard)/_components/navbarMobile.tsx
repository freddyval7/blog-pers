"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarMobile() {
  const path = usePathname();

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant={"ghost"} size={"icon"}>
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <nav>
          <ul>
            <li className="flex flex-col">
              <Link href="/dashboard">
                <SheetClose>
                  <Button
                    className={cn(
                      "hover:font-bold hover:scale-110 transition-all",
                      path === "/dashboard" ? "font-bold" : ""
                    )}
                    variant={"ghost"}
                  >
                    Dashboard
                  </Button>
                </SheetClose>
              </Link>
              <Link href="/blogs">
                <SheetClose>
                  <Button
                    className={cn(
                      "hover:font-bold hover:scale-110 transition-all",
                      path === "/blogs" ? "font-bold" : ""
                    )}
                    variant={"ghost"}
                  >
                    Blogs
                  </Button>
                </SheetClose>
              </Link>
              {/* User options */}
              <Link href="/">
                <SheetClose>
                  <Button
                    className={"hover:font-bold hover:scale-110 transition-all"}
                    variant={"ghost"}
                  >
                    Logout
                  </Button>
                </SheetClose>
              </Link>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
