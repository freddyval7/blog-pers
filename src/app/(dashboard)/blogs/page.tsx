import BlogCard from "./_components/blogCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import prisma from "@/lib/prisma";
import { Session, getServerSession } from "next-auth";

export default async function BlogsPage() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  const blogs = await getBlogsProps({ session });

  return (
    <div className="px-12 h-full">
      <div className="flex items-center">
        <h1 className="text-4xl my-8 font-bold w-full text-center">Blogs</h1>
        <Link href="/blogs/new">
          <Button variant={"main"}>
            <PlusSquare size={24} className="mr-2" />
            Create Blog
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-8">
        <div className="border-2 border-black">{/* Filters and Search */}</div>
        <div className="flex flex-col gap-8 col-span-3">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              title={blog.title}
              content={blog.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

async function getBlogsProps({ session }: { session: Session }) {
  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email as string,
    },
  });

  const blogs = await prisma.blog.findMany({
    where: {
      author: {
        id: user?.id,
      },
    },
  });

  return blogs;
}

export type BlogsPageProps = Awaited<ReturnType<typeof getBlogsProps>>;
