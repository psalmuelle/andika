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
import { Select as AntDSelect } from "antd";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  numberOfArticles: z.string().min(1, {
    message: "Number of articles must be at least 1",
  }),
  primaryGoal: z.string().min(2, {
    message: "Select at least one primary goal",
  }),
  audience: z.string().min(2, {
    message: "Select at least one type of audience",
  }),
  contentStructure: z.array(z.string()).nonempty({
    message: "Select the content structure",
  }),
  idealLength: z.string().min(1, {
    message: "Select the ideal word count range of the article(s)",
  }),
  usefulLinks: z.string(),
  titles: z.string(),
});

function RequestArticleForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numberOfArticles: "",
      primaryGoal: "",
      audience: "",
      contentStructure: [],
      idealLength: "",
      usefulLinks: "",
      titles: "",
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
          name="numberOfArticles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Article{"(s)"}</FormLabel>
              <FormControl>
                <Input type={"number"} placeholder="1-100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="audience"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Audience</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Developers">Developers</SelectItem>
                  <SelectItem value="Startup Founders">
                    Startup Founders
                  </SelectItem>
                  <SelectItem value="General Tech Readers">
                    General Tech Readers
                  </SelectItem>
                  <SelectItem value="Enterprise Decision-makers">
                    Enterprise Decision-makers
                  </SelectItem>
                  <SelectItem value="Blockchain Enthusiasts">
                    Blockchain Enthusiasts
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"primaryGoal"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary Goal of Article{"(s)"}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the primary goal of the article(s)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Promote a product">
                    Promote a product
                  </SelectItem>
                  <SelectItem value="Educate readers">
                    Educate readers
                  </SelectItem>
                  <SelectItem value="Establish thought leadership">
                    Establish thought leadership
                  </SelectItem>
                  <SelectItem value="Provide how-to guidance">
                    Provide how-to guidance
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"contentStructure"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content Structure</FormLabel>
              <FormControl>
                <AntDSelect
                  mode={"multiple"}
                  className="custom-select-placeholder w-full"
                  suffixIcon={<CaretSortIcon color="grey" className="block" />}
                  dropdownStyle={{
                    border: "1px solid #E5E7EB",
                    borderRadius: "4px",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.05)",
                  }}
                  placeholder="Please select content structure of the articles"
                  onChange={field.onChange}
                  defaultValue={field.value}
                  options={[
                    { label: "Tutorial", value: "Tutorial" },
                    {
                      label: "Step-by-step Guide",
                      value: "Step-by-step Guide",
                    },
                    { label: "Case Study", value: "Case Study" },
                    { label: "Beginner's Guide", value: "Beginner's Guide" },
                    { label: "Explainer", value: "Explainer" },
                    {
                      label: "Comparison or Review",
                      value: "Comparison or Review",
                    },
                  ]}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"idealLength"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ideal Length of Article{"(s)"}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select the ideal word count range of the article(s)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="250-500">250-500 words</SelectItem>
                  <SelectItem value="500-1500">500-1500 words</SelectItem>
                  <SelectItem value="1500-3000">1500-3000 words</SelectItem>
                  <SelectItem value="3000+">Above 3000 words</SelectItem>
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
                  placeholder="key resources, e.g the links to SDK documentation, existing articles and blog contents"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name={"titles"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Topics of articles- if any</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="If you have a proposed article topic, kindly share it here."
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

export default RequestArticleForm;