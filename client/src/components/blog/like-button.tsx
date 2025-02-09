"use client";

import {
  likeBlogPost,
  unlikeBlogPost,
  hasLikedBlogPost,
  getBlogPost,
} from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface LikeButtonProps {
  slug: string;
}

export function LikeButton({ slug }: LikeButtonProps) {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState<number>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPost(slug).then((post) => {
      setLikeCount(post._count.likes);
    });
    hasLikedBlogPost(slug)
      .then((hasLiked) => {
        setLiked(hasLiked);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  const handleLike = async () => {
    try {
      if (!liked) {
        await likeBlogPost(slug);
        const blog = await getBlogPost(slug);
        setLikeCount(blog._count.likes);
        setLiked(true);
        toast({
          title: "Liked post",
          description: "Liked post",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while liking the post",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={handleLike}
      disabled={loading}
    >
      <Heart
        className={`h-5 w-5 ${liked ? "fill-current text-red-500" : ""}`}
      />
      {!liked && "Like this post"}
      <span>{likeCount}</span>
    </Button>
  );
}
