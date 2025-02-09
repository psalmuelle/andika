"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRightIcon, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { BlogPost, getBlogPost } from "@/lib/blog";

interface BlogPreviewCardProps {
  blog: BlogPost;
  className?: string;
}

export function PublicBlogCard({ blog, className }: BlogPreviewCardProps) {
  const [likes, setLikes] = useState<number>(0);
  useEffect(() => {
    if (!blog) return;
    const getBlog = async () => {
      const fetchedBlog = await getBlogPost(blog.slug);
      setLikes(fetchedBlog._count.likes);
    };

    getBlog();
  }, [blog]);
  return (
    <Card className={cn("flex h-full flex-col", className)}>
      {blog.featuredImage && (
        <div className="relative h-48 w-full rounded-t-xl">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="rounded-t-xl object-cover"
          />
        </div>
      )}
      <CardHeader className="px-5">
        <CardTitle className="line-clamp-2 text-lg font-bold">
          {blog.title}
        </CardTitle>
        <div className="flex items-center gap-x-2 pt-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            {blog.author.avatar && (
              <Image
                src={blog.author.avatar}
                alt={blog.author.name}
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <div className="text-sm">
              <p className="font-semibold">{blog.author.name}</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-x-1 font-medium">
            <Heart className="h-4 w-4 text-red-500" />
            {likes}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="line-clamp-3 opacity-80">{blog.excerpt}</p>
      </CardContent>
      <CardContent className="flex items-center justify-end space-x-4">
        <Link href={`/blog/${blog.slug}`}>
          <Button>
            Read More <ArrowRightIcon className="h-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
