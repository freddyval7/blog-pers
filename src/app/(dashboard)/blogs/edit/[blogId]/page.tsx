import BlogFormEdit from "../_components/blogFormEdit";

export default function EditBlogPage() {
  return (
    <div className="w-1/2 md:w-1/3 border-2 rounded-md shadow-md p-8 mx-auto mt-40 space-y-8">
      <h1 className="text-center text-2xl font-bold">Edit Blog</h1>
      <BlogFormEdit />
    </div>
  )
}
