import { loadBlogs } from "@/lib/utils";
import BlogCard, { BlogCardProps } from "./_components/blogCard";

export default async function BlogsPage() {
  const blogs: BlogCardProps[] = await loadBlogs();

  return (
    <div className="px-12 h-full">
      <h1 className="text-4xl my-8 font-bold w-full text-center">Blogs</h1>
      <div className="grid grid-cols-4 gap-8">
        <div className="border-2 border-black">
          {/* Filters and Search */}
        </div>
        <div className="flex flex-col gap-8 col-span-3">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} id={blog.id} title={blog.title} description={blog.description} image={blog.image} />
          ))}
        </div>
      </div>
    </div>
  );
}
