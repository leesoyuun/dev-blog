---
description: 3-layer 아키텍처 규약 — 디렉토리 구조와 import 경계
---

# Project Structure

## 3-Layer 아키텍처

```
src/app/         — 라우팅·metadata·providers (조립만)
src/features/    — 도메인 모듈 (비즈니스 로직)
src/shared/      — 범용 유틸·컴포넌트 (도메인 무관)
contents/        — MDX 콘텐츠 (Git Submodule)
```

## Import 규칙

```
app/ → features/, shared/   ✅
features/ → shared/          ✅
shared/ → (외부 패키지만)    ✅

features/A → features/B      ❌ feature 간 직접 import 금지
shared/ → features/          ❌ shared가 feature에 의존 금지
app/ → app/ (page 간 직접)   ❌ 라우팅은 Next.js 파일시스템으로
```

## features/ 도메인 목록

각 도메인은 `index.ts`로 public API를 명시적으로 export:

```
features/
├── posts/       — 포스트 목록·상세·MDX 파싱
├── tags/        — 태그 필터링
├── series/      — 시리즈 그룹핑
├── search/      — 정적 검색 인덱스
├── views/       — 조회수 (KV)
├── comments/    — 댓글
├── theme/       — 다크모드 토글
├── lightbox/    — 이미지 확대
└── about/       — 소개 페이지
```

## shared/ 구조

```
shared/
├── components/  — 범용 UI (ThemeProvider, Layout 등)
├── ui/          — shadcn/ui 컴포넌트
├── utils/       — cn(), 날짜 포매팅 등
├── hooks/       — useMediaQuery 등 범용 훅
├── types/       — 공유 타입 (Post, Tag 등)
├── config/      — 사이트 메타데이터, 상수
├── seo/         — OG 이미지, structured data
├── styles/      — 전역 CSS, 폰트
└── modules/     — 외부 라이브러리 래퍼
```

## 파일명 규칙

- 컴포넌트: `PascalCase.tsx`
- 훅: `use-kebab-case.ts`
- 유틸: `kebab-case.ts`
- 상수: `SCREAMING_SNAKE` 또는 `kebab-case.ts`
- 라우트 파일: Next.js 규약 (`page.tsx`, `layout.tsx`, `loading.tsx`)
