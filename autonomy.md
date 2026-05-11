# 자율 판단 범위

에이전트(특히 오케스트레이터)가 **사용자 확인 없이 실행해도 되는 범위**와 **반드시 확인이 필요한 범위**를 구분한다.

## 자율 실행 허용 (무확인)

- `src/` 내부 코드 작성·수정 (기능 범위 내)
- 신규 테스트 파일(`__tests__/`) 추가·수정
- 로컬 빌드·린트·테스트 실행 (`pnpm build`, `pnpm lint`, `pnpm test` 등)
- `_workspace/` 중간 산출물 파일 생성·수정·삭제
- `docs/TASKS.md`의 체크박스 상태 업데이트 (완료된 태스크만)
- `docs/CHANGELOG.md` (또는 유사 로그) 항목 추가
- 컴파운드 사이클 내 팀원 간 `SendMessage`·`TaskUpdate`
- shadcn MCP로 기존 쉐드씨엔 컴포넌트 추가 (`src/shared/components/ui/`)
- context7 MCP로 라이브러리 문서 조회
- vercel MCP **읽기 전용** 호출 — 배포 상태(`get_deployment`·`list_deployments`), 빌드/런타임 로그(`get_deployment_build_logs`·`get_runtime_logs`), 프로젝트 메타(`get_project`·`list_projects`), Vercel 공식 문서 검색(`search_vercel_documentation`)

## 사용자 확인 필수 (반드시 질문 → 승인 대기)

- **아키텍처 변경**: 새 최상위 디렉토리 추가, 3 Laws 경계 조정, feature 도메인 추가·삭제·병합
- **의존성 변경**: `package.json`에 패키지 추가·제거·메이저 업그레이드 (`pnpm add/remove`)
- **빌드 설정 변경**: `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss`, `tailwind` 설정
- **공개 API 계약 변경**: `features/*/index.ts`의 export 제거, 타입 시그니처 변경 (기존 호출자 깨짐)
- **규칙 변경**: `.claude/rules/*.md` 수정 또는 신규 규칙 추가
- **하네스 변경**: `.claude/agents/`, `.claude/skills/`, `.claude/settings.json`, `.mcp.json` 수정
- **ROADMAP·PRD 변경**: `docs/ROADMAP.md`, `docs/PRD_*.md` 수정
- **Git 쓰기 작업**: `git commit`, `git push`, `git reset`, `gh pr create`, 브랜치 삭제 등 (workflow.md의 절대 금지 규칙 참조)
- **contents/ 변경**: 포스트 발행·삭제·대규모 수정 (초안은 `_workspace/`에서 승인 후 이동)
- **프로덕션 환경에 영향 주는 변경**: Vercel 배포 설정, 환경 변수, 리다이렉트 규칙
- **Vercel MCP 쓰기 명령**: `mcp__vercel__deploy_to_vercel` 등 신규 배포·환경 변경·도메인 조작 호출은 자동 실행 금지 (읽기 전용 호출은 위 자율 범주 참조)

## 확인 절차 (AskUserQuestion)

사용자 확인이 필요한 판단 지점을 만났을 때:

1. **작업 중단** — 추측으로 진행하지 않는다.
2. **컨텍스트 요약** — 왜 이 결정이 필요한지 1~2문장.
3. **선택지 제시** — 최소 2개, 최대 4개 옵션. 추천안은 첫 번째에 `(Recommended)` 표기.
4. **결과 반영** — 사용자 응답 후 해당 방향으로만 진행.

## ESCALATE 조건

다음 상황에서는 자율 진행을 즉시 중단하고 사용자에게 보고:

- 컴파운드 사이클 REVIEW가 **3회 반복 후에도 PASS 미획득**
- **보안 관련 위반** 발견 (하드코딩 시크릿, 인증 우회, XSS 벡터 등)
- 빌드·테스트가 **같은 원인으로 3회 이상 실패**
- 팀원 간 **합의 불가한 경계면 불일치** (`boundary-mismatch-qa`가 중재 실패)
- 의존성 취약점 발견 — 사용자에게 패치 전략 질의

## Why this rule exists

dev-blog는 1인 저자 블로그로, **자동화의 가치**(반복 작업 제거)와 **통제의 가치**(콘텐츠·아키텍처 정체성 보존)가 팽팽하게 맞선다. 이 규칙은 "자동화해도 되는 것"과 "사람이 판단해야 하는 것"의 경계를 명시해, 에이전트의 과잉 자율 실행(unwanted destructive action)을 방지한다.

## 구현 가이드

- 에이전트는 모든 **확인 필수** 작업 전에 `AskUserQuestion` 호출
- 오케스트레이터는 Phase 전환 시 해당 Phase가 자율 실행 범위 내인지 체크
- `autonomy.md` 위반 패턴이 GC에서 3회+ 발견되면 → 해당 패턴을 이 파일에 추가 (피드백 루프)

## 관련 룰

- `.claude/rules/review-discipline.md` — EXECUTE 후 REVIEW 단계 강제 (자율 실행 범위 내 품질 보장 메커니즘)
- `.claude/rules/workflow.md` — Git 쓰기 절대 금지 규칙 (자율 실행 예외 중 최상위)
