import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="flex items-center gap-x-2 cursor-pointer hover:opacity-75 transition-all" href="/">
      <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      <span className="font-bold text-lg">U Blog</span>
    </Link>
  );
}
