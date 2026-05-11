---
description: REVIEW 단계 강제 — EXECUTE 후 DOCUMENT 직행 금지
---

# Review Discipline

## 핵심 규칙

**EXECUTE 완료 직후 DOCUMENT로 직행 금지. 반드시 REVIEW 단계를 거친다.**

```
EXECUTE → REVIEW → VALIDATE → DOCUMENT  ✅
EXECUTE → DOCUMENT                        ❌ 절대 금지
EXECUTE → VALIDATE → DOCUMENT            ❌ REVIEW 생략 금지
```

## REVIEW 단계 체크리스트

REVIEW 에이전트는 다음을 명시적으로 검사한다:

1. **no-fallback.md** 위반 패턴 존재 여부
2. **TypeScript strict** 위반 (`any`, 단언 남용, `!` 연산자)
3. **테스트 누락** — 새 로직에 대응하는 테스트가 없는 경우
4. **접근성** — 인터랙티브 요소에 keyboard/ARIA 속성 누락
5. **comments.md** 위반 — 불필요한 주석 존재 여부
6. **아키텍처 경계** — feature 간 직접 import, shared 오용

## 판정 기준

| 판정 | 조건 | 다음 단계 |
|------|------|-----------|
| PASS | 체크리스트 전원 통과 | VALIDATE |
| FIX | 1~2개 항목 수정 필요 | 수정 → 재REVIEW |
| ESCALATE | 3회 반복 PASS 미획득 / 보안 위반 | 사용자 보고 후 중단 |

## Why

REVIEW 없이 DOCUMENT로 직행하면 품질 검증 없이 "완료" 상태가 된다. 이 룰은 컴파운드 사이클의 품질 보장 핵심 장치다.
