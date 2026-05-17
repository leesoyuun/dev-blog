import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, FileText, Clock, User, ArrowLeft } from "lucide-react";
import { SERIES } from "@/features/series/data";
import { ShareButton } from "@/features/series/ShareButton";
import { SeriesProgress } from "@/features/series/SeriesProgress";

export function generateStaticParams() {
  return SERIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const series = SERIES.find((s) => s.slug === slug);
  if (!series) return {};
  return {
    title: series.title,
    description: series.description,
  };
}

export default async function SeriesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const series = SERIES.find((s) => s.slug === slug);
  if (!series) notFound();

  const lastPost = series.posts.at(-1);
  const updatedDate = lastPost
    ? new Date(lastPost.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">

        {/* ── Main content ── */}
        <main className="lg:col-span-8">

          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="mb-8 flex items-center gap-1.5 text-sm">
            <Link href="/series" className="text-primary hover:underline underline-offset-4">
              Series
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-foreground">{series.title}</span>
          </nav>

          {/* Series header */}
          <div className="mb-10">
            <h1 className="mb-5 text-5xl font-black leading-[1.1] text-foreground lg:text-6xl">
              {series.title}
            </h1>

            <p className="mb-8 max-w-2xl text-lg leading-[1.8] text-muted-foreground">
              {series.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <FileText className="h-4 w-4" />
                {series.count} Posts
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                Updated {updatedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                이소윤
              </span>
            </div>
          </div>

          {/* Post list */}
          <ol className="space-y-3">
            {series.posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex items-start gap-5 rounded-lg border border-border/60 p-6 transition-shadow hover:shadow-md"
                >
                  <div className="min-w-0 flex-1">
                    <span className="mb-2 block text-3xl font-black leading-none text-muted-foreground/25">
                      {String(post.order).padStart(2, "0")}
                    </span>
                    <h2 className="mb-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mb-3 text-sm leading-[1.7] text-muted-foreground">
                      {post.description}
                    </p>
                    <time
                      dateTime={post.date}
                      className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                    >
                      {new Date(post.date)
                        .toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                        .toUpperCase()}
                    </time>
                  </div>
                  <div className="h-24 w-24 flex-shrink-0 rounded-lg bg-surface-container" />
                </Link>
              </li>
            ))}
          </ol>
        </main>

        {/* ── Sidebar ── */}
        <aside className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-28 space-y-4">

            <SeriesProgress
              seriesSlug={series.slug}
              postSlugs={series.posts.map((p) => p.slug)}
            />

            {/* Navigation links */}
            <div className="space-y-1">
              <Link
                href="/series"
                className="flex items-center gap-2.5 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-container hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to all series
              </Link>
              <ShareButton />
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
}
