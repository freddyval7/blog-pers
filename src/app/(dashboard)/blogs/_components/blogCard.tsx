import Image from "next/image";
import Link from "next/link";

export type BlogCardProps = {
  id: number;
  title: string;
  content?: string;
  image?: string;
};

export default function BlogCard({
  title,
  content,
  image,
  id,
}: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${id}`}
      className="flex gap-x-4 hover:scale-105 transition-all hover:cursor-pointer"
    >
      <div className="h-full w-1/2 relative">
        <Image
          className="rounded-sm"
          src={image ?? "/forest.jpg"}
          alt="blog img"
          fill
        />
      </div>
      <div>
        <h2 className="font-bold">{title}</h2>
        <p className="line-clamp-3">{content}</p>
      </div>
    </Link>
  );
}
