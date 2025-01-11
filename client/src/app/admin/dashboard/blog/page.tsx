"use client";

import { BlogList } from "@/components/blog/blog-list";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getBlogPosts, deleteBlogPost, updateBlogPost } from "@/lib/blog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function BlogManagementPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: getBlogPosts,
  });

  const updateMutation = useMutation({
    mutationFn: ({ slug, published }: { slug: string; published: boolean }) =>
      updateBlogPost(slug, { published }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive",
      });
    },
  });

  const handlePublishToggle = async (slug: string, published: boolean) => {
    await updateMutation.mutateAsync({ slug, published });
  };

  const handleDelete = async (slug: string) => {
    await deleteMutation.mutateAsync(slug);
  };

  return (
    <div className="mt-10 min-h-[90vh] space-y-6 px-[5%]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Blog Management</h2>
          <p className="text-muted-foreground">
            Create, edit, and manage your blog posts
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/dashboard/blog/create">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div>
          <Spin fullscreen spinning />
        </div>
      ) : (
        <BlogList
          posts={posts}
          onPublishToggle={handlePublishToggle}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
