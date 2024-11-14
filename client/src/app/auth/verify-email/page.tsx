"use client";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Typography from "@/components/ui/typography";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/config/axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export default function VerifyEmail() {
  const router = useRouter();
  const { toast } = useToast();
  const email = localStorage.getItem("email");
  const [btnLoading, setBtnLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (!email) throw new Error("Email not found");
      const response = await axiosInstance.post("/auth/email/verify", {
        email,
        verificationCode: data.pin,
      });

      if (response.status === 200) {
        localStorage.removeItem("email");
        router.push("/auth/login");
        setBtnLoading(false);
      } else {
        throw new Error("Verification failed");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: 'Verification failed!',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setBtnLoading(false);
    }
  }

  return (
    <div className="flex min-h-[90vh] flex-col items-center px-[5%]">
      <Typography as="h4" className="mb-14 mt-[20vh] text-center">
        Verify Email
      </Typography>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-fit max-w-[280px] flex-col items-center justify-center space-y-6 text-center"
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot className="uppercase" index={0} />
                      <InputOTPSlot className="uppercase" index={1} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot className="uppercase" index={2} />
                      <InputOTPSlot className="uppercase" index={3} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot className="uppercase" index={4} />
                      <InputOTPSlot className="uppercase" index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button size={'lg'} loading={btnLoading} className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
