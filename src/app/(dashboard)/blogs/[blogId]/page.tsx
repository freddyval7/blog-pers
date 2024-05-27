import prisma from "@/lib/prisma";
import Blog from "./blog";

export default async function BlogPage({
  params,
}: {
  params: { blogId: string };
}) {
  const blog = await prisma.blog.findFirst({
    where: {
      id: parseInt(params.blogId),
    },
  });

  if (!blog) {
    throw new Error("Blog not found");
  }

  return (
    <div>
      <Blog blog={blog} />
    </div>
  );
}
