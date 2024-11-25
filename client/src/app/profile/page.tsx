"use client";
import { useState } from "react";
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
import useProfileStore from "@/context/profile";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Provide your name",
  }),
  company: z.string().min(2, {
    message: "Company name is required",
  }),
  position: z.string(),
});

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const createProfile = useProfileStore((state) => state.createProfile);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      position: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      await createProfile(values);
      toast({
        title: "Profile created successfully",
        description: "You can now access all features",
      });
      setIsLoading(false);
      router.push("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Uh oh! ${error instanceof AxiosError ? error.response?.data.message : "Something went wrong"}`,
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-[90vh] flex-col items-center justify-center px-[5%]">
      <div className="mx-auto mt-12 w-full max-w-[420px]">
        <CardHeader className="text-center">
          <Typography as="h4">Thank you for signing up</Typography>
          <CardDescription>
            Kindly fill in your profile details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Company</FormLabel>
                    <FormControl>
                      <Input placeholder="X-Company" {...field} />
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
                        <SelectItem value="Founder/CEO/CTO">
                          Founder/CEO/CTO
                        </SelectItem>
                        <SelectItem value="Tech-Lead">Tech-Lead</SelectItem>
                        <SelectItem value="Software Engineer">
                          Software Engineer
                        </SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
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
        </CardContent>
      </div>
    </div>
  );
}
