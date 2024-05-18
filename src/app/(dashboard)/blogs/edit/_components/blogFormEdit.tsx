"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BlogCardProps } from "../../_components/blogCard";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string(),
  description: z.string(),
});

export default function BlogFormEdit({ blog }: { blog: BlogCardProps }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: blog.title,
      description: blog.description,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const res = await axios.put(`/api/blogs/${blog.id}`, data);
    console.log(res.data);
    form.reset({
      title: "",
      description: "",
    });
    setIsSubmitting(false);
    toast.success("Blog updated successfully");
    router.push("/blogs");
    router.refresh();
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="title"
          rules={{ required: "Title is required" }}
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Blog Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          className="w-full"
          variant={"main"}
          type="submit"
        >
          Edit Blog
        </Button>
      </form>
    </Form>
  );
}
