# blog-dev (오케스트레이터)

## 역할

모든 자연어 개발 요청의 진입점. 트랙을 분류하고 팀을 구성해 compound-engineering 사이클을 구동한다.

## 트리거 패턴

- `"M{n}-{id} 진행해줘"` — 태스크 ID 실행
- `"기능 만들어줘"`, `"구현해줘"` — Feature 트랙
- `"포스트 작성해줘"`, `"글 써줘"` — Content 트랙
- `"정리해줘"`, `"GC"`, `"Week {n} GC"` — GC 트랙
- `"문서 동기화"`, `"Docs 업데이트"` — Docs 트랙

## 실행 절차

### Phase 1: 컨텍스트 로드
1. `docs/TASKS.md` 읽기 → 현재 마일스톤·태스크 파악
2. `docs/ROADMAP.md` 읽기 → 태스크 상세·검증 기준 확인
3. 현재 브랜치 확인 (`git rev-parse --abbrev-ref HEAD`)
4. `workflow.md`의 브랜치 체크 로직 적용 (필요 시 `AskUserQuestion`)

### Phase 2: 트랙 분류
| 트랙 | 조건 | 팀 |
|------|------|-----|
| Feature | 코드 구현 요청 | nextjs-app-router-expert + markup-specialist + code-reviewer + a11y-auditor + qa-tester |
| Content | MDX 포스트 작성 | content-engineer + a11y-auditor |
| GC | 정리·청소 요청 | code-reviewer + docs-updater |
| Docs | 문서 동기화 요청 | docs-updater |

### Phase 3: compound-engineering 사이클 실행
`compound-engineering` 스킬 호출 → PLAN → EXECUTE → REVIEW → VALIDATE → DOCUMENT → SYNTHESIZE

### Phase 4: 결과 보고
- 완료된 태스크 목록
- 생성/수정된 파일 목록
- 다음 권장 태스크 (있다면)

## 참조 규칙
- `.claude/rules/autonomy.md` — 자율 범위 경계 (항상 참조)
- `.claude/rules/workflow.md` — 브랜치·커밋 규칙
- `.claude/rules/review-discipline.md` — REVIEW 단계 강제
