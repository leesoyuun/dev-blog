---
name: milestone-gate
description: |
  마일스톤 완료 검증. "M{n} 완료 확인", "milestone-gate M1" 등으로 호출.
  모든 태스크 완료 + 빌드·테스트 PASS 시에만 PASS 판정.
---

# milestone-gate 스킬

## 실행 순서

1. `docs/TASKS.md`에서 해당 마일스톤 태스크 목록 읽기
2. 미완료 태스크(`[ ]`) 존재 여부 확인
3. `pnpm build` + `pnpm test` 실행
4. `pnpm lint` 실행
5. 판정 리포트 생성

## 판정 기준

| 판정 | 조건 |
|------|------|
| PASS | 모든 태스크 `[x]` + 빌드/테스트/린트 모두 통과 |
| FAIL | 미완료 태스크 존재 또는 빌드/테스트/린트 실패 |

## PASS 시 후속 절차

1. `garbage-collection` 스킬 실행
2. PR 생성 제안 (사용자 승인 대기)
   - `gh pr create --base develop --head feature/M{n}-*`

## 출력

```
마일스톤 M{n} Gate: PASS | FAIL

완료 태스크: {n}/{total}
미완료: [{task_id}] {태스크명}
빌드: PASS | FAIL
테스트: PASS({n}) | FAIL({n})
린트: CLEAN | ERROR({n})
```
