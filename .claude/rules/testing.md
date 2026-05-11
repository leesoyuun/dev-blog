---
description: 테스트 전략 — Testing Trophy, TDD, Vitest
---

# Testing

## Testing Trophy 분포

```
E2E (Playwright)        ~10% — 핵심 사용자 시나리오
Integration (Vitest)    ~60% — 컴포넌트 + 서비스 통합
Unit (Vitest)           ~30% — 순수 함수·유틸
```

## TDD 사이클

Red → Green → Refactor. 새 기능은 테스트 먼저 작성.

## 파일 위치

```
src/features/posts/__tests__/get-posts.test.ts
src/shared/utils/__tests__/cn.test.ts
tests/e2e/home.spec.ts
```

## 테스트 작성 원칙

- **구현 세부사항 테스트 금지** — 인터페이스(입출력)만 검증
- **실제 의존성 사용** — DB mock 금지 (Testing Library 권장)
- 테스트 이름: `"should [behavior] when [condition]"` 형식
- 각 테스트는 독립적, 순서 의존 금지

```ts
// ✅ 행동 검증
it("should return posts sorted by date descending", () => {
  const posts = getPosts();
  expect(posts[0].date >= posts[1].date).toBe(true);
});

// ❌ 구현 세부사항
it("should call fs.readdirSync", () => {
  expect(fs.readdirSync).toHaveBeenCalled();
});
```

## 커버리지 기준

새 feature 추가 시 통합 테스트 필수. 유틸 함수는 단위 테스트 필수. E2E는 핵심 경로(홈→포스트→태그)만.
