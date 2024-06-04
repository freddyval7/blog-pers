"use client";

import { useForm } from "react-hook-form";
import { UserProps } from "../page";
import { z } from "zod";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string(),
  email: z.string(),
});

export default function UserForm({ user }: { user: UserProps }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const session = useSession();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const res = await axios.put(`api/user/${user?.id}`, data);
    if (res.status !== 200) {
      setIsSubmitting(false);
      return toast.error("Failed to update user");
    }
    setIsSubmitting(false);
    toast.success("User updated successfully");
    router.refresh();
  };

  return (
    <div className="gap-8 md:w-[650px] mx-auto md:mt-12 rounded-md p-4 md:p-8 shadow-md border-2">
      <div className="relative w-full md:w-auto flex justify-center mb-8">
        <Image
          src={session?.data?.user?.image ?? "/avatar.png"}
          alt="user image"
          className="rounded-full"
          width={100}
          height={100}
        />
      </div>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            defaultValue={user?.username}
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-500" htmlFor={field.name}>
                  Username
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <FormField
            defaultValue={user?.email}
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-purple-500" htmlFor={field.name}>
                  Email
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage></FormMessage>
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              size={"lg"}
              variant={"main"}
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
