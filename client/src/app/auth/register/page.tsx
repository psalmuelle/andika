"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import useUserStore from "@/context/auth";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const formSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export default function Register() {
  const { register } = useUserStore();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await register(values).then((res) => {
        if (res) {
          setIsLoading(false);
          localStorage.setItem("email", values.email);
          router.push(res.redirectUrl);
        }
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof AxiosError
            ? error.response?.data.message
            : "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center px-[5%]">
      <div className="mt-8 text-center">
        <Typography as="h4">Welcome to Andika</Typography>
        <p>Sign up for an account</p>
      </div>
      <section className="mx-auto my-8 w-full max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="****" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="lg"
              loading={isLoading}
              className="w-full"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Form>
        <div>
          <p className="mb-4 mt-6 text-center text-neutral-500">
            OR CONTINUE WITH
          </p>
          <Button asChild variant={"outline"} size={"lg"} className="w-full">
            <Link href={"http://localhost:8000/api/auth/google"}>
              <img
                width="32"
                height="32"
                className="pr-2"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
              />
              Google
            </Link>
          </Button>
        </div>
        <Link href={"/auth/login"} className="mt-6 block text-center underline">
          Already have an account? Sign in
        </Link>
      </section>
    </div>
  );
}
