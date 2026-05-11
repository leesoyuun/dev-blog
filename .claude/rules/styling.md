---
description: Tailwind CSS v4 스타일링 패턴
---

# Styling

## Tailwind v4 기본 규칙

- `@import "tailwindcss"` — v4는 별도 config 파일 없음, CSS-first
- 커스텀 토큰은 `globals.css`의 `@theme inline` 블록에 정의
- 다크모드: `class` 전략 (next-themes가 `.dark` 클래스 추가)

## cn() 사용

조건부 클래스는 반드시 `cn()` 사용:

```tsx
import { cn } from "@/shared/utils/cn";

// ✅
<div className={cn("base-class", isActive && "active-class", className)} />

// ❌ 템플릿 리터럴 직접 조합
<div className={`base-class ${isActive ? "active" : ""}`} />
```

## 금지 패턴

```tsx
// ❌ 인라인 style 속성 (애니메이션·동적 값 제외)
<div style={{ color: "red" }} />

// ❌ 하드코딩 컬러 값 (CSS 변수 사용)
className="bg-[#ffffff]"
// ✅
className="bg-background"

// ❌ !important
className="!text-red-500"
```

## 반응형 우선순위

모바일 우선 (Tailwind 기본): `base → sm → md → lg → xl`

```tsx
// ✅ 모바일 우선
<div className="flex flex-col md:flex-row" />
```

## 다크모드

CSS 변수를 활용해 `.dark` 클래스 전환:

```css
/* globals.css */
:root { --background: #ffffff; }
.dark { --background: #0a0a0a; }
```

```tsx
// ✅ 변수 기반
<div className="bg-background text-foreground" />

// ❌ dark: 접두사 남용
<div className="bg-white dark:bg-black" />
```
