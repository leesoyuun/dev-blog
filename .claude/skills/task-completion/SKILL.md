---
name: task-completion
description: |
  단일 태스크 완료 처리. compound-engineering의 DOCUMENT 단계에서 자동 호출.
  TASKS.md 체크박스 업데이트 + CHANGELOG 항목 추가.
---

# task-completion 스킬

## 실행 조건

- VALIDATE 단계 PASS 확인 후에만 실행
- 자율 실행 범위 (`autonomy.md` 허용)

## 실행 순서

1. `docs/TASKS.md`에서 해당 태스크 ID(`M{n}-{id}`) 찾기
2. `[ ]` → `[x]` 업데이트
3. `docs/CHANGELOG.md` (없으면 생성) 항목 추가:
   ```
   - M{n}-{id}: {태스크 설명} (`관련 파일`)
   ```
4. 완료 보고

## 금지 사항

- TASKS.md에 새 항목 추가 (체크만 허용)
- ROADMAP.md 수정
- 사용자 확인 없이 Git 커밋

## 출력

`태스크 M{n}-{id} 완료 처리: TASKS.md ✓ CHANGELOG ✓`
