"use client";
import { CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/config/axios";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Provide your name",
  }),
  avatar: z.string(),
  position: z.string(),
});

export default function Profile() {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      position: "",
      avatar: "",
    },
  });
  const mutateProfile = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const profile = await axiosInstance.post("/profile/admin", values, {
        withCredentials: true,
      });

      return profile;
    },

    onSuccess() {
      toast({
        title: "Profile created successfully",
        description: "You can now access all features",
      });

      router.push("/admin/dashboard");
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error instanceof AxiosError ? error.response?.data.message : "Something went wrong"}`,
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await mutateProfile.mutateAsync(values);
  }
  return (
    <>
      <header className="sticky top-0 z-20 bg-white/70 px-[5%] py-3 text-center shadow-sm backdrop-blur">
        <h1 className="scroll-m-20 font-mono text-xl font-semibold tracking-tight text-zinc-800">
          Andika
        </h1>
      </header>
      <div className="flex min-h-[90vh] flex-col items-center justify-center px-[5%]">
        <div className="mx-auto mt-12 w-full max-w-[420px]">
          <CardHeader className="text-center">
            <Typography as="h4">Add your profile detail</Typography>
            <CardDescription>
              Kindly fill in your profile details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your fullname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role that applies to you" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Project Manager">
                            Project Manager
                          </SelectItem>
                          <SelectItem value="Technical Writer">
                            Technical Writer
                          </SelectItem>
                          <SelectItem value="Snr. Technical Writer">
                            Snr. Technical Writer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <Button
                  size={"lg"}
                  loading={mutateProfile.isSuccess}
                  className="w-full"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </div>
      </div>
    </>
  );
}
