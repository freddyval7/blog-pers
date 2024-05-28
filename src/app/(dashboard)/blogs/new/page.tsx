import BlogForm from "./_components/blogForm";

export default function NewBlogPage() {
  return (
    <div className="w-[90%] md:w-1/3 border-2 rounded-md shadow-md p-8 mx-auto mt-20 space-y-8">
      <h1 className="text-center text-2xl font-bold">Create New Blog</h1>
      <BlogForm />
    </div>
  )
}
