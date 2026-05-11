---
description: TypeScript strict 규약 — any 금지, 명시적 타입
---

# TypeScript

## Strict 설정

`tsconfig.json`의 `strict: true` + `noUncheckedIndexedAccess: true` + `noImplicitOverride: true` 필수.

## 금지 패턴

```ts
// ❌ any 사용 — 타입 정보 소실
const data: any = fetch(url);
function process(input: any) {}

// ❌ as 단언 남용 — 런타임 에러 유발
const el = document.getElementById("id") as HTMLInputElement;

// ❌ ! 연산자 — null 가능성 무시
const value = map.get(key)!;

// ❌ @ts-ignore / @ts-expect-error 무분별 사용
```

## 허용 패턴

```ts
// ✅ unknown으로 수신 후 좁히기
const data: unknown = await response.json();
if (isPost(data)) { ... }

// ✅ 타입 가드
function isPost(v: unknown): v is Post {
  return typeof v === "object" && v !== null && "slug" in v;
}

// ✅ Result 패턴 (fallback 대신 명시적 에러)
type Result<T> = { ok: true; value: T } | { ok: false; error: string };

// ✅ 배열 인덱스 접근 (noUncheckedIndexedAccess)
const first = arr[0]; // Post | undefined — undefined 처리 필수
if (first) { ... }
```

## 타입 정의 위치

- 공유 타입: `src/shared/types/`
- 도메인 타입: 해당 feature 내부
- Props 타입: 컴포넌트 파일 내 인라인
- API 응답 타입: Zod 스키마로 런타임 검증 후 타입 추출

## Zod 사용 기준

MDX frontmatter, 외부 API 응답, 환경 변수 등 **시스템 경계**에서만 Zod 검증. 내부 함수 간 전달에는 TypeScript 타입으로 충분.
