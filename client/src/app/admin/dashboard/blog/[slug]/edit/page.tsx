"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBlogPost, updateBlogPost } from "@/lib/blog";
import type { UpdateBlogPost } from "@/lib/blog";
import { BlogForm } from "@/components/blog/blog-form";
import { useToast } from "@/hooks/use-toast";
import { Spin } from "antd";

export default function EditBlogPost({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const { toast } = useToast();

  const { data: post, isLoading: isLoadingPost } = useQuery({
    queryKey: ["blog-post", params.slug],
    queryFn: () => getBlogPost(params.slug),
  });

  const { mutateAsync: handleUpdate, isPending: isUpdating } = useMutation({
    mutationFn: (data: UpdateBlogPost) => updateBlogPost(params.slug, data),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      router.push("/admin/dashboard/blog");
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    },
  });

  if (isLoadingPost) {
    return (
      <div>
        <Spin spinning fullscreen />
      </div>
    );
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="mt-10 min-h-[90vh] space-y-6 px-[5%]">
      <h1 className="text-2xl font-bold tracking-tight">Edit Blog Post</h1>
      <div className="mx-auto max-w-3xl">
        <BlogForm
          initialData={post}
          onSubmit={async (data) => {
            handleUpdate(data);
          }}
          loading={isUpdating}
        />
      </div>
    </div>
  );
}
