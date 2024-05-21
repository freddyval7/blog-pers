"use client";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavbarMobile from "./navbarMobile";

export default function Navbar() {
  const path = usePathname();

  return (
    <div className="flex items-center justify-between h-14 px-8">
      <Logo />
      <nav className="md:block hidden">
        <ul>
          <li>
            <Link href="/dashboard">
              <Button
                className={cn(
                  "hover:font-bold hover:scale-110 transition-all",
                  path === "/dashboard" ? "font-bold" : ""
                )}
                variant={"ghost"}
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/blogs">
              <Button
                className={cn(
                  "hover:font-bold hover:scale-110 transition-all",
                  path === "/blogs" ? "font-bold" : ""
                )}
                variant={"ghost"}
              >
                Blogs
              </Button>
            </Link>
            {/* User options */}
            <Link href="/">
              <Button
                className={"hover:font-bold hover:scale-110 transition-all"}
                variant={"ghost"}
              >
                Logout
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
      <nav className="block md:hidden">
        <NavbarMobile />
      </nav>
    </div>
  );
}
