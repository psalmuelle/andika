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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  startupName: z.string().min(2, {
    message: "Enter startup name",
  }),
  industry: z.string().min(1, {
    message: "select industry",
  }),
  documentationType: z.string().min(2, {
    message: "Select documentation type",
  }),
  usefulLinks: z.string(),
});

export default function RequestApiDocForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startupName: "",
      industry: "",
      documentationType: "",
      usefulLinks: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="startupName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of Startup/Company</FormLabel>
              <FormControl>
                <Input placeholder="Startup's name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select startup niche" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Technology and Software">
                    Technology and Software
                  </SelectItem>
                  <SelectItem value="Healthcare and Life Sciences">
                    Healthcare and Life Sciences
                  </SelectItem>
                  <SelectItem value="Financial Services and Fintech">
                    Financial Services and Fintech
                  </SelectItem>
                  <SelectItem value="E-commerce and Retail">
                    E-commerce and Retail
                  </SelectItem>
                  <SelectItem value="Education and EdTech">
                    Education and EdTech
                  </SelectItem>
                  <SelectItem value="Energy and Clean Technology">
                    Energy and Clean Technology
                  </SelectItem>
                  <SelectItem value="Agriculture and AgriTech">
                    Agriculture and AgriTech
                  </SelectItem>
                  <SelectItem value="Transportation and Mobility">
                    Transportation and Mobility
                  </SelectItem>
                  <SelectItem value="Media and Entertainment">
                    Media and Entertainment
                  </SelectItem>
                  <SelectItem value="Real Estate and Property Technology (PropTech)">
                    Real Estate and Property Technology (PropTech)
                  </SelectItem>
                  <SelectItem value=" Human Resources and HR Tech">
                    Human Resources and HR Tech
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="documentationType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Documentation Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select documentation type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="API Documentation">
                    API Documentation
                  </SelectItem>
                  <SelectItem value="SDK Documentation">
                    SDK Documentation
                  </SelectItem>
                  <SelectItem value="API & SDK Documentation">Both</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"usefulLinks"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Useful Links & Materials- if any</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="E.g link to landing page of product"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button size={"lg"} className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}