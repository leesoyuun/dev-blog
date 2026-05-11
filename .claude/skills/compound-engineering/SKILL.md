---
name: compound-engineering
description: |
  6단계 품질 사이클 정의. blog-dev 오케스트레이터가 호출.
  PLAN → EXECUTE → REVIEW → VALIDATE → DOCUMENT → SYNTHESIZE
---

# compound-engineering 스킬

## 6단계 사이클

### PLAN
- 요구사항 분석, 의존성 확인, 변경 파일 목록 작성
- 산출물: `_workspace/plan_{task}_analysis.md`

### EXECUTE (병렬)
- `nextjs-app-router-expert` + `markup-specialist` 병렬 실행
- (Content 트랙) `content-engineer` 단독 실행
- 산출물: `_workspace/execute_{task}_logic.md`

### REVIEW (핑퐁, 최대 3회)
- `code-reviewer` + `a11y-auditor` 병렬 3-way 리뷰
- PASS → VALIDATE 진행
- FIX → 수정 후 재REVIEW
- ESCALATE → 사용자 보고 후 중단
- 산출물: `_workspace/review_{task}_iter{N}.md`

### VALIDATE
- `qa-tester`: `pnpm build` + `pnpm test` + 경계면 QA
- FAIL → EXECUTE로 롤백
- 산출물: `_workspace/qa_{task}_report.md`

### DOCUMENT
- `docs-updater`: TASKS.md 체크박스 + CHANGELOG 항목 추가
- 산출물: `_workspace/docs_update_{date}.md`

### SYNTHESIZE
- 전체 사이클 요약, 사용자 보고
- 완료 파일 목록, 다음 권장 태스크
- 산출물: `_workspace/synthesize_{task}_summary.md`

## 자동 ESCALATE 조건

- REVIEW 3회 후 PASS 미획득
- 빌드 동일 원인 3회 이상 실패
- 보안 위반 발견
