import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { PostCard } from "@/features/posts/PostCard";
import { SeriesCard } from "@/features/series/SeriesCard";
import { getPosts } from "@/features/posts/get-posts";

const SERIES = [
  {
    slug: "react-deep-dive",
    title: "React 깊이 파헤치기",
    description: "렌더링 원리, Concurrent Mode, Compiler까지 — React의 내부를 단계적으로 해부하는 시리즈.",
    count: 5,
    tags: ["React"],
  },
  {
    slug: "next-js-complete",
    title: "Next.js 완전 정복",
    description: "App Router, 데이터 패칭, 배포 전략까지 Next.js로 프로덕션 앱을 만드는 모든 것.",
    count: 8,
    tags: ["Next.js"],
  },
  {
    slug: "typescript-patterns",
    title: "TypeScript 고급 패턴",
    description: "조건부 타입, 템플릿 리터럴, Mapped Types 등 실무에서 바로 쓸 수 있는 고급 타입 패턴.",
    count: 4,
    tags: ["TypeScript"],
  },
] as const;

export default function Home() {
  const posts = getPosts();
  const recent = posts.slice(0, 6);

  return (
    <>
      {/* Intro */}
      <section className="border-b border-border/50 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h1 className="mb-6 text-4xl font-black leading-[1.15] lg:text-5xl">
            안녕하세요 👋
            <br />
            <span className="font-black text-foreground">프론트엔드 개발자 </span>
            <span className="text-primary">이소윤</span>
            <span className="font-black text-foreground">입니다.</span>
          </h1>
          <div className="mb-8 max-w-2xl space-y-4 text-base leading-[1.8] text-muted-foreground">
            <p>
              사용자 경험과 인터페이스 개선에 중점을 두고 끊임없이 배우고 성장하는 개발자입니다.
              디자인과 개발 사이에서 최적의 균형을 찾는 데 열정을 가지고 있습니다.
            </p>
            <p>
              이 블로그는 프론트엔드 개발 과정에서 배운 것들과 경험을 기록하고 공유하는 공간입니다.
              React, TypeScript, 웹 성능 최적화 등 실무에서 마주하는 다양한 주제를 다룹니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/leesoyuun"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-container"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/%EC%86%8C%EC%9C%A4-%EC%9D%B4-988a2621b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-container"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="mailto:leesoyun4206@icloud.com"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface-container"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">최근 포스트</h2>
          <Link href="/posts" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
            전체 보기 →
          </Link>
        </div>
        {recent.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recent.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
        )}
      </section>

      {/* Series */}
      <section className="bg-surface-container-low py-16">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">시리즈</h2>
            <Link href="/series" className="text-sm font-medium text-primary transition-colors hover:text-primary/80">
              전체 보기 →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {SERIES.map((series) => (
              <SeriesCard key={series.slug} series={series} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
