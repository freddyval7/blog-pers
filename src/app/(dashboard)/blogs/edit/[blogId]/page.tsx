import BlogFormEdit from "../_components/blogFormEdit";
import prisma from "@/lib/prisma";

export default async function EditBlogPage({
  params,
}: {
  params: { blogId: string };
}) {
  const blog = await prisma.blog.findFirst({
    where: {
      id: +params.blogId,
    },
  })

  if (!blog) {
    throw new Error("Blog not found");
  }

  return (
    <div className="w-1/2 md:w-1/3 border-2 rounded-md shadow-md p-8 mx-auto mt-20 space-y-8">
      <h1 className="text-center text-2xl font-bold">
        Edit Blog {`"${blog.title}"`}
      </h1>
      <BlogFormEdit blog={blog} />
    </div>
  );
}
