---
description: React 19 + Next.js App Router 컴포넌트 패턴
---

# React

## Server Component 우선

- 기본값은 **Server Component (RSC)**. `"use client"` 는 꼭 필요할 때만.
- `"use client"` 필요 조건: `useState`, `useEffect`, 브라우저 API, 이벤트 핸들러
- 데이터 페칭은 RSC에서. 클라이언트 fetch / TanStack Query 도입 금지 (SSG-first).

```tsx
// ✅ RSC — 데이터 페칭은 서버에서
export default async function PostList() {
  const posts = await getPosts();
  return <ul>{posts.map(p => <PostItem key={p.slug} post={p} />)}</ul>;
}

// ❌ 금지 — 클라이언트 fetch
"use client";
export default function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => { fetch("/api/posts").then(...) }, []);
}
```

## React Compiler 활성화 환경

React 19 Compiler를 사용하므로 수동 `useMemo`/`useCallback` 추가 금지.
Compiler가 자동 최적화한다. 기존 코드에서도 제거 대상.

## 컴포넌트 작성 규칙

- Props 타입은 인라인 또는 같은 파일 내 `type Props = {}`로 정의
- default export는 파일당 하나
- 컴포넌트명은 파일명과 일치
- Fragment는 `<>` 단축형 사용

## 금지 패턴

```tsx
// ❌ any props
function Component(props: any) {}

// ❌ 불필요한 forwardRef (React 19에서 ref는 props로 직접 전달)
const Comp = forwardRef<HTMLDivElement, Props>((props, ref) => ...)
// ✅ React 19
function Comp({ ref, ...props }: Props & { ref?: Ref<HTMLDivElement> }) {}

// ❌ useEffect로 데이터 동기화
useEffect(() => { setData(transform(input)) }, [input])
// ✅ 파생 값은 렌더 중 계산
const data = transform(input);
```
