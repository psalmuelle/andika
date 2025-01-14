"use client";

import { likeBlogPost, unlikeBlogPost, hasLikedBlogPost } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface LikeButtonProps {
  slug: string;
  initialLikes: number;
}

export function LikeButton({ slug, initialLikes }: LikeButtonProps) {
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      if (liked) {
        await unlikeBlogPost(slug);
        setLikeCount((prev) => prev - 1);
        setLiked(false);

        toast({
          title: "Removed like from post",
          description: "Removed like from post",
        });
      } else {
        await likeBlogPost(slug);
        setLikeCount((prev) => prev + 1);
        setLiked(true);
        toast({
          title: "Liked post",
          description: "Liked post",
        });
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "An error occurred while liking the post",
      });
    }
  };

  return (
    <Button
      variant="secondary"
      size="lg"
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
