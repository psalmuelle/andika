"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MarkdownEditor } from "./blog-editor";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import { Upload } from "antd";

const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.string().transform((str) => str.split(",").map((s) => s.trim())),
  published: z.boolean().default(false),
  featuredImage: z.string().optional(),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

interface BlogFormProps {
  initialData?: BlogFormValues;
  onSubmit: (data: BlogFormValues) => Promise<void>;
  loading?: boolean;
}

export function BlogForm({ initialData, onSubmit, loading }: BlogFormProps) {
  const { toast } = useToast();
  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      published: initialData?.published || false,
      featuredImage: initialData?.featuredImage || "",
    },
  });

  const handleSubmit = async (data: BlogFormValues) => {
    try {
      await onSubmit(data);
      toast({
        title: "Success",
        description: initialData ? "Blog post updated" : "Blog post created",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mx-auto space-y-8 pb-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea
                  title="Title"
                  className="text-xl font-bold"
                  placeholder="Enter blog title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt (up to 150 words)</FormLabel>
              <FormControl>
                <Textarea
                  maxLength={150}
                  placeholder="Enter blog excerpt"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  defaultValue={initialData?.tags?.join(", ") || ""}
                  placeholder="Enter tags separated by commas"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="featuredImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured Image</FormLabel>
              <FormControl>
                <Upload
                  listType={"picture-card"}
                  maxCount={1}
                  withCredentials={true}
                  action={"http://localhost:8000/api/upload"}
                  onChange={(info) => {
                    const { status } = info.file;
                    if (status === "done") {
                      field.onChange(info.file.response.fileUrl);
                    }
                  }}
                >
                  Upload +
                </Upload>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <MarkdownEditor
                  content={field.value}
                  onContentChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Publish</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Make this post public
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update Post" : "Create Post"}
        </Button>
      </form>
    </Form>
  );
}
