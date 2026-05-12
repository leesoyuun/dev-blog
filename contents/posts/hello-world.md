---
title: "첫 번째 포스트"
description: "블로그를 시작합니다. 앞으로 React, TypeScript, 웹 성능 최적화 등 프론트엔드 주제를 다룰 예정입니다."
date: "2026-05-11"
tags: ["React", "TypeScript"]
---

## 프롤로그

프론트엔드 개발을 하다 보면 매일 새로운 것을 배웁니다. 그 경험들을 기록하지 않으면 금방 잊어버리고 맙니다. 이 블로그는 배운 것들을 정리하고, 같은 문제를 겪고 있는 다른 개발자들과 공유하기 위해 시작했습니다.

## 왜 블로그를 시작하는가

프론트엔드 개발을 하다 보면 매일 새로운 것을 배웁니다. React의 렌더링 최적화, TypeScript의 고급 타입 패턴, 웹 성능 지표 개선... 이런 경험들을 기록하지 않으면 금방 잊어버리고 맙니다.

이 블로그는 제가 배운 것들을 정리하고, 같은 문제를 겪고 있는 다른 개발자들과 공유하기 위해 시작했습니다. 완벽한 글보다는 솔직하고 실용적인 내용을 담으려 합니다.

> "The best way to learn is to teach." — 배운 것을 글로 쓰는 것 자체가 깊은 이해로 이어진다.

## React 19와 Server Components

React 19는 프론트엔드 개발 패러다임을 크게 바꿨습니다. 특히 Server Components의 등장은 "어디서 렌더링할 것인가"에 대한 질문을 완전히 새롭게 정의했습니다.

### Server Component의 핵심 아이디어

기존 SPA 방식에서는 거대한 JavaScript 번들을 클라이언트에 전달하고, 브라우저가 파싱한 뒤 데이터를 fetch해 화면을 구성했습니다. Server Components는 이 흐름을 뒤집습니다.

```tsx
// 이것은 Server Component — 클라이언트 번들에 포함되지 않음
async function PostList() {
  const posts = await db.posts.findMany();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

컴포넌트가 서버에서만 실행되므로 DB 쿼리를 직접 호출할 수 있고, 민감한 로직이 클라이언트에 노출되지 않습니다.

### Client Component와의 경계

`"use client"` 디렉티브는 경계를 명시합니다. 이 경계 아래의 컴포넌트만 클라이언트 번들에 포함됩니다.

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

## TypeScript 고급 패턴

TypeScript를 쓴다고 해서 타입 안전성이 자동으로 보장되는 건 아닙니다. `any`를 남발하거나 `as` 단언을 사용하면 오히려 런타임 에러를 가리는 코드가 됩니다.

### Discriminated Union으로 상태 모델링

```typescript
type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function render<T>(state: AsyncState<T>) {
  switch (state.status) {
    case "idle": return <Idle />;
    case "loading": return <Spinner />;
    case "success": return <Data value={state.data} />;
    case "error": return <Error message={state.error} />;
  }
}
```

타입 내로잉(type narrowing)을 활용하면 컴파일 타임에 모든 케이스를 처리했는지 확인할 수 있습니다.

### Template Literal Types

```typescript
type EventName = `on${Capitalize<string>}`;
type CSSProperty = `${string}-${string}`;

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";
type ButtonClass = `btn-${ButtonVariant}-${ButtonSize}`;
// "btn-primary-sm" | "btn-primary-md" | ... (9가지 조합)
```

## 웹 성능 최적화 전략

Core Web Vitals는 구글이 정의한 사용자 경험 지표입니다. LCP, CLS, FID(또는 INP) 세 가지가 핵심입니다.

### LCP (Largest Contentful Paint)

뷰포트 내 가장 큰 콘텐츠가 렌더링되는 시간입니다. 2.5초 이하가 목표입니다.

- `next/image`로 이미지 자동 최적화
- 중요 리소스에 `priority` 속성 추가
- 폰트 로딩 전략 최적화 (`next/font`)

### CLS (Cumulative Layout Shift)

레이아웃이 얼마나 예기치 않게 이동하는지 측정합니다. 0.1 이하가 목표입니다.

이미지와 광고에 명시적인 `width`/`height`를 지정하거나 `aspect-ratio`를 사용해 공간을 미리 확보하는 것이 핵심입니다.

## 앞으로 다룰 주제들

이 블로그에서 다룰 예정인 주제들을 미리 공유합니다.

- **React 렌더링 최적화** — Concurrent Mode, Suspense, Transition API
- **Next.js App Router 심층 분석** — RSC, Streaming, Partial Prerendering
- **TypeScript 고급 패턴** — 조건부 타입, Mapped Types, Infer
- **CSS 최신 기법** — Container Queries, @layer, Cascade Layers
- **웹 접근성** — ARIA, 키보드 네비게이션, 스크린리더 호환성

꾸준히 작성하겠습니다. 읽어주셔서 감사합니다!
