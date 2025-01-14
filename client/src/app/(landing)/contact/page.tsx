"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Enter your name",
  }),
  email: z.string().email(),
  message: z.string().min(2, {
    message: "Leave a message please",
  }),
});

export default function Contact() {
  const { toast } = useToast();
  const [btnLoading, setBtnLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setBtnLoading(true);

      //Some actions here!

      console.log(values);
      setBtnLoading(false);
      form.reset();
      toast({
        variant: "default",
        title: "Message Sent Successfully",
        description:
          "We have received your message. We will get back to you shortly",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setBtnLoading(false);
    }
  }
  return (
    <div className="min-h-screen px-[4%] py-14">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-2xl font-bold md:text-3xl">Get in Touch</h1>
        <p className="mx-auto mt-4 max-w-2xl">
          Have questions or want to discuss a project? We&apos;d love to hear from
          you. Fill out the form below or reach us via email.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Form</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"message"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write your message here"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  loading={btnLoading}
                  className="w-full"
                  size="lg"
                >
                  Send Message
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Additional Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-700">
                Our team is available to assist you Monday through Friday, 9:00
                AM - 6:00 PM.
              </p>
              <div>
                <h3 className="font-medium text-gray-900">Email</h3>
                <p className="text-sm text-gray-600">
                  <a
                    href="mailto:hello@andika.com"
                    className="text-blue-600 hover:underline"
                  >
                    hello@andika.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Social Media</h3>
                <p className="text-sm text-gray-600">
                  Follow us on:{" "}
                  <a
                    href="https://twitter.com/andika"
                    className="text-blue-600 hover:underline"
                  >
                    Twitter
                  </a>
                  ,{" "}
                  <a
                    href="https://linkedin.com/company/andika"
                    className="text-blue-600 hover:underline"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
