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
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  username: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export default function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validPassword, setValidPassword] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>();

  const onSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);
    if (data.password !== data.confirmPassword) {
      setValidPassword(false);
      return;
    }
    await axios.post("/api/register", data);
    form.reset();
    toast.success("User registered successfully");
    router.push("/login");
    setIsSubmitting(false);
  });

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={onSubmit}>
        <FormField
          name="username"
          control={form.control}
          rules={{ required: "Username is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage></FormMessage>
            </FormItem>
          )}
        />
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
        <FormField
          name="confirmPassword"
          control={form.control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage>
                {validPassword ? "" : "Passwords do not match"}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button
          disabled={isSubmitting}
          className="w-full"
          variant={"main"}
          type="submit"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}
