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
import useUserStore from "@/context/auth";
import useProfileStore from "@/context/profile";
import Typography from "@/components/ui/typography";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Provide your name",
  }),
  company: z.string().min(2, {
    message: "Company name is required",
  }),
  position: z.string(),
  refferalCode: z.string(),
});

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const user: any = useUserStore((state) => state.user);
  const createProfile = useProfileStore((state) => state.createProfile);
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      company: "",
      position: "",
      refferalCode: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const newProfile = {
      userId: user?.id,
      name: values.name,
      company: values.company,
      position: values.position,
      refferedBy: values.refferalCode ? values.refferalCode : null,
    };
    const response = await createProfile(newProfile);
    if (response && response.status === 201) {
      toast({
        title: "Profile created successfully",
        description: "You can now access all features",
      });
      router.push(response.data.redirectUrl);
      
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: `Uh oh! ${response.data.message}`,
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
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

              <FormField
                control={form.control}
                name="refferalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Refferal Code</FormLabel>
                    <FormControl>
                      <Input
                        className="uppercase"
                        maxLength={6}
                        placeholder="optional"
                        {...field}
                      />
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
        </CardContent>
      </div>
    </div>
  );
}
