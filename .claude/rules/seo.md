---
description: SEO 규약 — Next.js Metadata API, OG, Sitemap
---

# SEO

## Metadata API

모든 page.tsx는 `generateMetadata` 또는 `export const metadata` 필수:

```tsx
// 정적 메타데이터
export const metadata: Metadata = {
  title: "포스트 제목",
  description: "포스트 설명 (120자 이내)",
};

// 동적 메타데이터
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPost(params.slug);
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
```

## OG 이미지

- 정적: `public/og.png` (1200×630)
- 동적: `app/og/route.tsx` (Next.js ImageResponse)

## 구조화 데이터

포스트 페이지: `Article` schema, 블로그 홈: `Blog` schema.
JSON-LD는 `<script type="application/ld+json">` 태그로 주입.

## URL 구조

```
/                    — 홈
/posts/[slug]        — 포스트 상세
/tags/[tag]          — 태그 필터
/series/[series]     — 시리즈
/about               — 소개
```

## sitemap.xml / robots.txt

- `app/sitemap.ts` — 동적 생성, 모든 포스트 포함
- `app/robots.ts` — `User-agent: *` 허용, `_next/` 차단

## 성능 지표 (Core Web Vitals 목표)

- LCP < 2.5s
- CLS < 0.1
- FID < 100ms
- 이미지는 모두 `next/image`, 폰트는 `next/font`
