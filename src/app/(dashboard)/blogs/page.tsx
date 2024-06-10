import BlogCard from "./_components/blogCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusSquare } from "lucide-react";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import SearchBar from "./_components/searchBar";
import SortMenu from "./_components/sort";
import SortMenuMobile from "./_components/sortMenuMobile";

type SearchParams = {
  search?: string;
  order: "asc" | "desc";
  date: "newest" | "oldest";
};

export default async function BlogsPage(params: {
  searchParams: SearchParams;
}) {
  const blogs = await getBlogsProps(params.searchParams);

  return (
    <div className="px-12 h-full">
      <div className="flex items-center flex-wrap relative md:flex-nowrap">
        <div className="md:hidden flex items-center absolute top-2.5 left-0">
          <SortMenuMobile />
        </div>
        <h1 className="text-4xl md:my-8 font-bold w-full text-center">Blogs</h1>
        <Link className="my-6 md:my-0 w-full md:w-auto" href="/blogs/new">
          <Button className="w-full md:w-auto" variant={"main"}>
            <PlusSquare size={24} className="mr-2" />
            Create Blog
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="border-2 rounded-md shadow-lg p-4 space-y-6 md:block hidden">
          <SearchBar />
          <SortMenu />
        </div>
        <div className="flex flex-col gap-8 col-span-3">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.content}
              />
            ))
          ) : (
            <h1 className="text-2xl text-muted-foreground">
              No blogs found...
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}

async function getBlogsProps(params: SearchParams) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }
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
      ...(params.search && { title: { contains: params.search } }),
    },
    orderBy: {
      title: params.order,
      //createdAt: (params.date === "newest" ? "desc" : "asc"), TODO: Fix this when Prisma supports it
    },
  });

  return blogs;
}

export type BlogsPageProps = Awaited<ReturnType<typeof getBlogsProps>>;
