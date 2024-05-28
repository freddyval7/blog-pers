import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function NavbarHome() {
  const session = await getServerSession(authOptions);

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
