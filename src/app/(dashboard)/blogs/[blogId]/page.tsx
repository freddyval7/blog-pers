import prisma from "@/lib/prisma";
import Blog from "./blog";

export default async function BlogPage({
  params,
}: {
  params: { blogId: string };
}) {
  const blog = await getBlogProps({ params });

  if (!blog) {
    throw new Error("Blog not found");
  }

  return (
    <div>
      <Blog blog={blog} />
    </div>
  );
}

async function getBlogProps({ params }: { params: { blogId: string } }) {
  const blog = await prisma.blog.findFirst({
    where: {
      id: parseInt(params.blogId),
    },
    include: {
      author: true,
    }
  });

  return blog;
}

export type BlogPageProps = Awaited<ReturnType<typeof getBlogProps>>;
