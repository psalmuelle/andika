"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogPost } from "@/lib/blog";
import { formatDistanceToNow } from "date-fns";
import { Eye, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface BlogListProps {
  posts: BlogPost[];
  onPublishToggle: (slug: string, published: boolean) => Promise<void>;
  onDelete: (slug: string) => Promise<void>;
}

export function BlogList({ posts, onPublishToggle, onDelete }: BlogListProps) {
  const handlePublishToggle = async (slug: string, currentState: boolean) => {
    try {
      await onPublishToggle(slug, !currentState);
    } catch (error) {
      console.error("Failed to toggle publish state:", error);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <Image
              width={300}
              height={200}
              className="mb-4 h-48 w-full rounded-lg object-cover"
              src={post.featuredImage!}
              alt={post.title}
            />
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <CardTitle className="mt-2 line-clamp-1 pr-3">
                  {post.title}
                </CardTitle>
                <CardDescription>
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </CardDescription>
              </div>
              <Switch
                checked={post.published}
                onCheckedChange={() =>
                  handlePublishToggle(post.slug, post.published)
                }
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <p className="line-clamp-2 text-sm text-muted-foreground">
                {post.excerpt}
              </p>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Eye className="mr-1 h-4 w-4" />
                    Preview
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/admin/dashboard/blog/${post.slug}/edit`}>
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this blog post? This
                      action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      onClick={() => onDelete(post.slug)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
