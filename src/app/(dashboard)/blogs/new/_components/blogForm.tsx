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

export default function BlogForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      title: "New Blog",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log(data);
    const res = await axios.post("/api/blogs", data);
    if (res.status !== 200) {
      setIsSubmitting(false);
      return toast.error("Failed to create blog");
    }
    form.reset({
      title: "",
      content: "",
    });
    setIsSubmitting(false);
    toast.success("Blog created successfully");
    router.push("/blogs");
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
          Create Blog
        </Button>
      </form>
    </Form>
  );
}
