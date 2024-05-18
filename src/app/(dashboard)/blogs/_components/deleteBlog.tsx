"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteBlogButton({ id }: { id: number }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(id: number) {
    setIsDeleting(true);
    const res = await axios.delete(`/api/blogs/${id}`);
    if (res.status === 204) {
      toast.success("Blog deleted successfully");
      setIsDeleting(false);
      router.push("/blogs");
      router.refresh();
    }
  }
  return (
    <Button
      disabled={isDeleting}
      onClick={() => handleDelete(id)}
      variant={"destructive"}
    >
      Delete
    </Button>
  );
}
