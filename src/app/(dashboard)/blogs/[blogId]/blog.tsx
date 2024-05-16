import Image from "next/image";
import { BlogCardProps } from "../_components/blogCard";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";

export interface BlogProps extends BlogCardProps {
  user: {
    name: string;
    avatar: string;
  };
}

export default function Blog({ blog }: { blog: BlogProps }) {
  return (
    <div className="flex gap-8 p-8 mx-12 mt-8">
      <div className="relative w-[30dvw] h-[60dvh]">
        <Image
          className="rounded-md"
          src={blog.image ?? "/forest.jpg"}
          alt={blog.title}
          fill
        />
      </div>
      <div className="space-y-4 flex-1">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold">{blog.title}</h1>
          <div className="flex items-center gap-x-4">
            <Link href={`/dashboard/blogs/${blog.id}/edit`}>
              <Pencil className="cursor-pointer hover:scale-105 transition-all hover:opacity-85" />
            </Link>
            <Trash
              className="cursor-pointer hover:scale-105 transition-all hover:opacity-85"
              color="red"
            />
          </div>
        </div>
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage src={"/avatar.png"} alt={"User"} />
          </Avatar>
          <p>Freddy Tomada</p>
        </div>
        <p>Published {format(Date.now(), "dd-MM-yyyy")}</p>
        <p>{blog.description}</p>
      </div>
    </div>
  );
}
