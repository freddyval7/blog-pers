"use client"

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function NavbarHome() {
  const {data: session} = useSession();

  return (
    <div className="flex items-center justify-between h-14 px-8">
      <Logo />
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">
              <Button variant={"main"}>
                {session?.user ? "Go to dashboard" : "Login"}
              </Button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
