import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isValidElement } from "react";
import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChevronLeft } from "lucide-react";
import {
  getPost,
  getPosts,
  extractHeadings,
  slugify,
} from "@/features/posts/get-posts";
import { TableOfContents } from "@/features/posts/TableOfContents";
import { CopyButton } from "@/features/posts/CopyButton";
import { cn } from "@/shared/utils/cn";

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

function childrenToText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(childrenToText).join("");
  if (isValidElement(node)) {
    return childrenToText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);

  return (
    <>
      {/* Hero */}
      <header className="bg-surface-container-low">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-20 lg:py-20">
          <Link
            href="/posts"
            className="mb-10 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            모든 포스트
          </Link>

          <div className={`grid grid-cols-1 items-center gap-12 ${post.thumbnail ? "lg:grid-cols-12" : ""}`}>
            {/* Left: meta + title + author */}
            <div className={post.thumbnail ? "lg:col-span-7" : "max-w-3xl"}>
              {post.tags.length > 0 && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="mb-8 text-5xl font-black leading-[1.1] tracking-tight text-foreground lg:text-6xl">
                {post.title}
              </h1>

              <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground">
                {post.description}
              </p>

              <time
                dateTime={post.date}
                className="mt-10 block text-sm text-muted-foreground"
              >
                {new Date(post.date).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>

            {/* Right: featured image — only when thumbnail exists */}
            {post.thumbnail && (
              <div className="lg:col-span-5">
                <div className="group relative aspect-square overflow-hidden rounded-xl shadow-2xl shadow-blue-500/10">
                  <Image
                    src={post.thumbnail}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-purple-600/20 mix-blend-overlay" />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-20 lg:py-24">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12">
          <article className="lg:col-span-9">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2({ children }) {
                  const id = slugify(childrenToText(children));
                  return (
                    <h2
                      id={id}
                      className="mb-6 mt-12 scroll-mt-24 text-3xl font-bold leading-tight text-foreground first:mt-0"
                    >
                      {children}
                    </h2>
                  );
                },
                h3({ children }) {
                  const id = slugify(childrenToText(children));
                  return (
                    <h3
                      id={id}
                      className="mb-4 mt-8 scroll-mt-24 text-2xl font-semibold leading-tight text-foreground"
                    >
                      {children}
                    </h3>
                  );
                },
                p({ children }) {
                  return (
                    <p className="mb-8 text-lg leading-[1.8] text-muted-foreground">
                      {children}
                    </p>
                  );
                },
                a({ href, children }) {
                  return (
                    <a
                      href={href}
                      className="text-primary underline underline-offset-4 transition-colors hover:text-primary/80"
                    >
                      {children}
                    </a>
                  );
                },
                ul({ children }) {
                  return (
                    <ul className="mb-8 ml-6 list-disc space-y-2 text-lg leading-[1.8] text-muted-foreground">
                      {children}
                    </ul>
                  );
                },
                ol({ children }) {
                  return (
                    <ol className="mb-8 ml-6 list-decimal space-y-2 text-lg leading-[1.8] text-muted-foreground">
                      {children}
                    </ol>
                  );
                },
                li({ children }) {
                  return <li>{children}</li>;
                },
                blockquote({ children }) {
                  return (
                    <blockquote className="my-12 rounded-r-lg border-l-4 border-primary bg-surface-container-low py-4 pl-8 text-xl font-medium italic text-foreground">
                      {children}
                    </blockquote>
                  );
                },
                pre({ children }) {
                  const codeText = childrenToText(children);
                  return (
                    <div className="group relative my-8">
                      <div className="absolute right-4 top-4 z-10 opacity-0 transition-opacity group-hover:opacity-100">
                        <CopyButton text={codeText} />
                      </div>
                      <div className="overflow-hidden rounded-xl border border-slate-800 bg-code-bg shadow-xl">
                        <div className="flex gap-2 px-6 pb-2 pt-5">
                          <div className="h-3 w-3 rounded-full bg-red-500/50" />
                          <div className="h-3 w-3 rounded-full bg-amber-500/50" />
                          <div className="h-3 w-3 rounded-full bg-emerald-500/50" />
                        </div>
                        <pre className="overflow-x-auto p-6 pt-4 font-mono text-sm leading-relaxed text-slate-300">
                          {children}
                        </pre>
                      </div>
                    </div>
                  );
                },
                code({ className, children }) {
                  if (className) {
                    return (
                      <code className={cn("font-mono text-sm", className)}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="rounded bg-surface-container px-1.5 py-0.5 font-mono text-[0.875em] text-primary">
                      {children}
                    </code>
                  );
                },
                hr() {
                  return <hr className="my-12 border-border" />;
                },
                strong({ children }) {
                  return (
                    <strong className="font-bold text-foreground">
                      {children}
                    </strong>
                  );
                },
                em({ children }) {
                  return <em className="italic">{children}</em>;
                },
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
