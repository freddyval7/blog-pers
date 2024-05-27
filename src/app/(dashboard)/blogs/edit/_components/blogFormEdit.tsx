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
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export default function BlogFormEdit({ blog }: {blog: {id: number, title: string, content: string}}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: blog.title,
      content: blog.content,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    await axios.put(`/api/blogs/${blog.id}`, data);
    form.reset({
      title: "",
      content: "",
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
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Content</FormLabel>
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
