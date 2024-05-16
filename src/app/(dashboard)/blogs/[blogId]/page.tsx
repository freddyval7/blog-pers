import { loadBlog } from "@/lib/utils";
import Blog from "./blog";

export default async function BlogPage({params}: {params: {blogId: string}}) {
  const blog = await loadBlog(params.blogId);

  return (
    <div>
      <Blog blog={blog} />
    </div>
  )
}
