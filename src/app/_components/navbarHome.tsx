import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavbarHome() {
  return (
    <div className="flex items-center justify-between h-14 px-8">
      <Logo />
      <nav>
        <ul>
          <li>
            <Link href="/dashboard">
              <Button variant={"main"}>Go to dashboard</Button>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
