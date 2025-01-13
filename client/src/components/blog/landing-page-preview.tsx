"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BlogPost, getBlogPosts } from "@/lib/blog";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

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
    <Carousel
      opts={{ align: "center" }}
      className="mx-auto w-[78%] max-w-[840px]"
    >
      <CarouselContent>
        {posts &&
          posts?.map((post) => (
            <CarouselItem
              key={post.id}
              className="py-1 pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <Card className="flex h-80 w-full flex-col justify-between">
                <CardHeader className="p-4">
                  <Image
                    src={post.featuredImage!}
                    alt={post.title}
                    width={256}
                    height={128}
                    className="h-32 w-full rounded-t-lg object-cover"
                  />
                  <CardTitle className="line-clamp-2 pt-2 leading-tight">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="line-clamp-2 text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardContent>
                <CardFooter className="justify-end">
                  <Button variant={"secondary"} size={"sm"} asChild>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="flex items-center"
                    >
                      Read <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}

        <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
          <Card className="flex h-80 w-full flex-col items-center justify-center">
            <Button asChild variant={"link"}>
              <Link href="/blog" className="flex items-center">
                See All <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
