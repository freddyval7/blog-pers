import Image from "next/image";
import { BlogCardProps } from "../_components/blogCard";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DeleteBlogButton from "../_components/deleteBlog";
import { BlogPageProps } from "./page";

export default function Blog({ blog }: { blog: BlogPageProps }) {
  if (!blog) {
    throw new Error("Blog not found");
  }

  return (
    <Dialog>
      <div className="flex gap-8 p-8 mx-12 mt-8">
        <div className="relative w-[30dvw] h-[60dvh]">
          <Image
            className="rounded-md"
            src={"/forest.jpg"}
            alt={blog?.title || "Blog Title"}
            fill
          />
        </div>
        <div className="space-y-4 flex-1">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <div className="flex items-center gap-x-4">
              <Link href={`/blogs/edit/${blog.id}`}>
                <Pencil className="cursor-pointer hover:scale-105 transition-all hover:opacity-85" />
              </Link>
              <DialogTrigger>
                <Trash
                  className="cursor-pointer hover:scale-105 transition-all hover:opacity-85"
                  color="red"
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="space-y-4">
                  <DialogTitle>Are you sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your blog.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                  <DeleteBlogButton id={blog.id} />
                  <DialogClose>
                    <Button>Cancel</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Avatar>
              <AvatarImage src={"/avatar.png"} alt={"User"} />
            </Avatar>
            <p>{blog.author.username}</p>
          </div>
          <p>Published {format(blog.createdAt, "dd-MM-yyyy")}</p>
          <p>{blog?.content}</p>
        </div>
      </div>
    </Dialog>
  );
}
