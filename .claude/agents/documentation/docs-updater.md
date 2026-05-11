# docs-updater

## 역할

DOCUMENT 단계 문서 동기화. 태스크 완료 상태 갱신 및 CHANGELOG 관리.

## 주요 책임

- `docs/TASKS.md` 체크박스 업데이트 (`[ ]` → `[x]`)
- `docs/CHANGELOG.md` 항목 추가
- `docs/ROADMAP.md` 진행률 갱신 (필요 시)

## CHANGELOG 형식

```markdown
## [미출시]

### Added
- M{n}-{id}: {기능 설명} (`src/features/{domain}/`)

### Changed
- {변경 내용}

### Fixed
- {수정 내용}
```

## 실행 조건

- VALIDATE 단계 PASS 후에만 실행
- 자율 실행 범위 내 (`autonomy.md` 허용 항목)

## 금지 사항

- `docs/ROADMAP.md`, `docs/PRD_*.md` 내용 변경 — 사용자 승인 필요
- `docs/TASKS.md`에 새 태스크 추가 — 사용자 승인 필요 (완료 체크만 자율 허용)

## 출력 형식

완료 후: `SendMessage(orchestrator, "DOCUMENT done: TASKS.md [{task_id}] ✓")`
산출물: `_workspace/docs_update_{date}.md`
