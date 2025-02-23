"use client";

import Carousel from "@/components/ui/carousel";
import { BlogPost, getBlogPosts } from "@/lib/blog";
import { useState, useEffect } from "react";

export default function BlogPreview() {
  const [posts, setPosts] = useState<BlogPost[]>();

  useEffect(() => {
    const avaialblePosts = async () => {
      const posts = await getBlogPosts();
      const avaialblePosts = posts
        ?.filter((post) => post.published === true)
        .slice(0, 3);

      setPosts(avaialblePosts);
    };

    avaialblePosts();
  }, []);
  return (
    <div className="relative h-full w-full overflow-hidden pb-20 pt-10">
      {posts && (
        <Carousel
          slides={posts.map((post) => ({
            ...post,
            href: `/blog/${post.slug}`,
            title: post.title,
            button: "Read More",
            src: post.featuredImage || "",
          }))}
        />
      )}
    </div>
  );
}
