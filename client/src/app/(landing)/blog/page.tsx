import { getBlogPosts } from "@/lib/blog";
import Typography from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { PublicBlogCard } from "@/components/blog/public-blog-card";

export const metadata = {
  title: "Blog | Andika",
  description: "Read the latest articles and insights from our team",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const publishedPosts = posts.filter((post) => post.published);

  // Get unique tags
  const allTags = publishedPosts.flatMap((post) => post.tags);
  const uniqueTags = Array.from(new Set(allTags));

  return (
    <div className="mx-auto min-h-screen space-y-12 px-[4%] py-14">
      <div className="space-y-4">
        <Typography as="h1" className="text-center">
          Our Blog
        </Typography>
        <Typography className="mx-auto max-w-2xl text-center text-muted-foreground">
          Discover insights, tutorials, and updates from our team. We write
          about content writing, technical documentation, and industry best
          practices.
        </Typography>
      </div>

      {uniqueTags.length > 0 && (
        <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-2">
          {uniqueTags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {publishedPosts.map((post) => (
          <PublicBlogCard key={post.id} blog={post} />
        ))}
      </div>

      {publishedPosts.length === 0 && (
        <div className="py-12 text-center">
          <Typography className="text-muted-foreground">
            No blog posts published yet. Check back soon!
          </Typography>
        </div>
      )}
    </div>
  );
}
