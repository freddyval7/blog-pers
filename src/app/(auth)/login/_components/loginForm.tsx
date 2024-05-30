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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Chrome } from "lucide-react";

const formSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
});

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>();

  const onSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      toast.error(res.error);
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={onSubmit}>
        <FormField
          name="email"
          control={form.control}
          rules={{ required: "Email is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
        <div className="w-full">
          <p className="text-center font-bold">Or</p>
        </div>
        <Button
        type="button"
          className="w-full"
          variant={"outline"}
          onClick={(e) => {
            signIn("google", {
              callbackUrl: "/dashboard",
            });
          }}
        >
          <Chrome className="mr-2" size={24} />
          Login with Google
        </Button>
        <div>
          <p>
            {"Don't"} have an account?{" "}
            <Link href="/register">
              <span className="text-purple-500">Register Now</span>
            </Link>
          </p>
        </div>
        <Button
          disabled={isSubmitting}
          className="w-full"
          variant={"main"}
          type="submit"
        >
          Login
        </Button>
      </form>
    </Form>
  );
}
