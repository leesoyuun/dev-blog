import Image from "next/image";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import type { Post } from "./get-posts";

type Props = {
  post: Post;
  featured?: boolean;
};

export function PostCard({ post, featured = false }: Props) {
  const visibleTags = post.tags.slice(0, 2);
  const remainingCount = post.tags.length - 2;

  return (
    <Link
      href={`/posts/${post.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-lg bg-surface-container transition-shadow hover:shadow-lg"
      )}
    >
      {post.thumbnail && (
        <div className={cn("relative w-full flex-shrink-0", featured ? "h-64" : "h-48")}>
          <Image src={post.thumbnail} alt={post.title} fill className="object-cover" />
        </div>
      )}
      <div className={cn("flex flex-1 flex-col", featured ? "p-8" : "p-6")}>
        <div className="mb-3 flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border/80 px-3 py-1 text-xs font-semibold text-muted-foreground"
            >
              #{tag}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="rounded-full border border-border/80 px-3 py-1 text-xs font-semibold text-muted-foreground">
              +{remainingCount}
            </span>
          )}
        </div>
        <h2
          className={cn(
            "font-bold leading-[1.1] text-foreground transition-colors group-hover:text-primary",
            featured ? "mb-4 text-3xl lg:text-4xl" : "mb-3 text-xl"
          )}
        >
          {post.title}
        </h2>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>
        <time dateTime={post.date} className="text-sm text-muted-foreground">
          {post.date}
        </time>
      </div>
    </Link>
  );
}
