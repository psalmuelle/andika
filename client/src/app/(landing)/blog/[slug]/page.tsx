import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { formatDate } from "date-fns";
import Link from "next/link";
import { CalendarIcon, ChevronLeft } from "lucide-react";
import { LikeButton } from "@/components/blog/like-button";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getBlogPost(params.slug);
    return {
      title: `${post.title} | Andika Blog`,
      description: post.excerpt,
    };
  } catch (err) {
    console.log(err);
    return {
      title: "Blog Post Not Found | Andika",
      description: "The requested blog post could not be found.",
    };
  }
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight, rehypeRaw, rehypeSlug]}
      remarkPlugins={[remarkGfm]}
      className="font-sans text-xl max-sm:text-lg"
    >
      {content}
    </ReactMarkdown>
  );
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post;
  try {
    post = await getBlogPost(params.slug);
  } catch (err) {
    console.log(err);
    notFound();
  }
  if (!post.published) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl space-y-12 px-2 pb-14 pt-10">
      <header className="space-y-8">
        <Link href="/blog">
          <Button variant="ghost" size="sm">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>
        <div className="space-y-4">
          <h1 className="text-5xl leading-5 font-bold max-sm:text-3xl">{post.title}</h1>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>
                  {post.author?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">Admin</p>
              </div>
            </div>
            <p className="flex items-center gap-1">
              <CalendarIcon className="h-4" />
              <span>{formatDate(post.createdAt, "PP")}</span>
            </p>
          </div>
        </div>
      </header>

      <div className="prose mx-auto">
        {post.featuredImage && (
          <div className="relative mb-8 aspect-video overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <MarkdownRenderer content={post.content} />
      </div>

      <footer className="flex justify-center">
        <LikeButton slug={params.slug} initialLikes={post._count.likes} />
      </footer>
    </article>
  );
}
