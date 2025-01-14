"use client";

import { BlogForm } from "@/components/blog/blog-form";
import { Button } from "@/components/ui/button";
import { type CreateBlogPost, createBlogPost } from "@/lib/blog";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreateBlogPost() {
  const router = useRouter();
  const mutateForm = useMutation({
    mutationFn: (post: CreateBlogPost) => createBlogPost(post),
    onSuccess: () => {
      router.push("/admin/dashboard/blog");
    },
  });

  return (
    <div className="min-h-[90vh] space-y-6 px-[5%]">
      <div className="mb-12 mt-4 space-y-2">
        <Button variant="link" size="sm" asChild>
          <Link href="/admin/dashboard/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog List
          </Link>
        </Button>
        <h2 className="pt-6 text-2xl font-bold tracking-tight">
          Create Blog Post
        </h2>
        <p className="text-muted-foreground">
          Create a new blog post to share with your audience
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <BlogForm
          onSubmit={async (data) => {
            mutateForm.mutateAsync(data);
          }}
          loading={mutateForm.isPending}
        />
      </div>
    </div>
  );
}
