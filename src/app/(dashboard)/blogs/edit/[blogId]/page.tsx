import { loadBlog } from "@/lib/utils";
import BlogFormEdit from "../_components/blogFormEdit";
import { BlogCardProps } from "../../_components/blogCard";

export default async function EditBlogPage({
  params,
}: {
  params: { blogId: string };
}) {
  const blog: BlogCardProps = await loadBlog(params.blogId);

  return (
    <div className="w-1/2 md:w-1/3 border-2 rounded-md shadow-md p-8 mx-auto mt-20 space-y-8">
      <h1 className="text-center text-2xl font-bold">
        Edit Blog {`"${blog.title}"`}
      </h1>
      <BlogFormEdit blog={blog} />
    </div>
  );
}
