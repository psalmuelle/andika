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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Typography from "@/components/ui/typography";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";

const formSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const login = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await axiosInstance.post("/auth/email/login", values, {
        withCredentials: true,
      });
      return response;
    },
    async onSuccess(data) {
      if (!data.data.user.isAdmin) {
        throw new Error();
      }

      const profile = await axiosInstance.get("/profile/admin/get", {
        withCredentials: true,
      });
      if (profile.status === 200) {
        router.push("/admin/dashboard");
      }
    },
    onError(error) {
      if (
        error instanceof AxiosError &&
        error.response?.data.message === "Profile not found"
      ) {
        router.push("/admin/auth/profile");
        return;
      }
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          error instanceof AxiosError
            ? error.response?.data.message
            : "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await login.mutateAsync(values);
  }

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/70 px-[5%] py-3 text-center shadow-sm backdrop-blur">
        <h1 className="scroll-m-20 font-mono text-xl font-semibold tracking-tight text-zinc-800">
          Andika
        </h1>
      </header>
      <div className="flex min-h-[90vh] flex-col items-center justify-center px-[5%]">
        <div className="mt-8 text-center">
          <Typography as="h4">Admin Authentication</Typography>
          <p className="font-medium">Welcome back!</p>
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
                loading={login.isPending}
                className="w-full"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
          <Link
            href={"/admin/auth/register"}
            className="mt-6 block text-center underline"
          >
            Sign up
          </Link>
        </section>
      </div>
    </>
  );
}
