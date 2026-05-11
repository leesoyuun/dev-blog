---
description: 주석 작성 기준 — 기본값은 No Comments
---

# Comments

기본값: **주석 없음**. 아래 조건을 만족할 때만 한 줄 추가.

## 주석을 작성해도 되는 경우

- **WHY가 코드에서 비명시적일 때** — 숨겨진 제약, 미묘한 불변식, 특정 버그 우회
- 코드를 읽는 사람이 처음 보면 의아할 만한 결정

## 절대 작성 금지

- WHAT을 설명하는 주석 (잘 명명된 식별자가 이미 설명)
- 현재 태스크·이슈 번호·수정 이유 참조 (`// M0-06에서 추가`, `// TODO: 나중에`)
- 다중 라인 docstring / 블록 주석
- 함수·컴포넌트 파라미터 설명 (타입 시그니처로 충분)

## 예시

```ts
// ❌ 금지 — WHAT 설명
// 사용자 목록을 반환한다
function getUsers() { ... }

// ❌ 금지 — 태스크 참조
// M1-03 작업에서 추가됨
const cache = new Map();

// ✅ 허용 — 비명시적 WHY (Next.js hydration 이슈 회피)
// suppressHydrationWarning: ThemeProvider가 html class를 클라이언트에서 변경
<html suppressHydrationWarning>

// ✅ 허용 — 숨겨진 제약
// pnpm v11 보안 모델: 빌드 스크립트는 onlyBuiltDependencies에 명시 필요
```
