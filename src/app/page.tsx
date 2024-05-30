"use client"

import { Button } from "@/components/ui/button";
import NavbarHome from "./_components/navbarHome";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const {data: session} = useSession();

  return (
    <div className="h-screen">
      <NavbarHome />
      <div className="max-w-screen-lg mx-auto pt-40">
        <div className="flex items-center flex-col gap-4">
          <h1 className="text-5xl font-bold text-center">
            {session?.user
              ? `Welcome back, ${session.user.name}`
              : "Welcome to U Blog"}
          </h1>
          <p className="text-center text-xl mt-4">
            Create your dream blog with U Blog
          </p>
          <Link className="mt-8" href="/dashboard">
            <Button variant={"main"}>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
