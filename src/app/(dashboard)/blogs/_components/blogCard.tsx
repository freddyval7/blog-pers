import Image from "next/image";

export default function BlogCard() {
  return (
    <div className="flex gap-x-4">
      <div className="h-full w-full relative">
        <Image className="rounded-sm" src={"/forest.jpg"} alt="blog img" fill />
      </div>
      <div>
        <h2 className="font-bold">Blog Title</h2>
        <p className="line-clamp-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
          aliquam velit hic ullam animi reiciendis consectetur doloremque quo
          dolores debitis, facilis odit accusantium mollitia ex assumenda, vitae
          fuga perferendis blanditiis.
        </p>
      </div>
    </div>
  );
}
