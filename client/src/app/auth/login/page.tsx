"use client";
import { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import useUserStore from "@/context/auth";
import { AxiosError } from "axios";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const login = useUserStore((state) => state.login);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await login(values).then((res) => {
        router.push(res.data.redirectUrl);
        setIsLoading(false);
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${(error instanceof AxiosError && error.response?.data.message) || "Something went wrong"}`,
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });

      if (error instanceof AxiosError && error.response?.data.redirectUri) {
        localStorage.setItem("email", values.email);
        router.push(error.response.data.redirectUri);
      }
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center px-[5%]">
      <div className="mt-8 text-center">
        <Typography as="h4">Welcome Back</Typography>
        <p>Login to your account</p>
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
              size={"lg"}
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
          <Button asChild size={"lg"} variant={"outline"} className="w-full">
            <Link href={"http://localhost:8000/api/auth/google"}>
              <Image
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
        <Link
          href={"/auth/register"}
          className="mt-6 block text-center underline"
        >
          Don&apos;t have an account? Sign up
        </Link>
      </section>
    </div>
  );
}
