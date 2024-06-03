import BlogFormEdit from "../_components/blogFormEdit";
import prisma from "@/lib/prisma";

export default async function EditBlogPage({
  params,
}: {
  params: { blogId: string };
}) {
  const blog = await getEditBlogProps({ params });

  return (
    <div className="w-[90%] md:w-1/3 border-2 rounded-md shadow-md p-8 mx-auto mt-20 space-y-8">
      <h1 className="text-center text-2xl font-bold">
        Edit Blog {`"${blog?.title}"`}
      </h1>
      <BlogFormEdit blog={blog} />
    </div>
  );
}

async function getEditBlogProps({ params }: { params: { blogId: string } }) {
  const blog = await prisma.blog.findFirst({
    where: {
      id: +params.blogId,
    },
  });

  return blog;
}

export type EditBlogPageProps = Awaited<ReturnType<typeof getEditBlogProps>>;
