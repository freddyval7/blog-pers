import BlogCard from "./_components/blogCard";

export default function BlogsPage() {
  return (
    <div className="px-12 h-full">
      <h1 className="text-4xl my-10 font-bold w-full text-center">Blogs</h1>
      <div className="grid grid-cols-4 gap-8">
        <div className="border-2 border-black"></div>
        <div className="flex flex-col gap-8 col-span-3">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  );
}
