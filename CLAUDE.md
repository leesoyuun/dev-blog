# chan9yu 개발 블로그

프론트엔드 엔지니어를 위한 1인 저자 기술 블로그.

## Stack

Next.js 16 App Router · React 19 (Compiler) · TypeScript 6 strict · Tailwind CSS 4 · shadcn/ui · lucide-react · next-themes

## Architecture

3-Layer: `app/` (라우팅·조립) → `features/` (9개 도메인 모듈) → `shared/` (범용). Feature 간 직접 import 금지.

```
src/app/         — 라우팅, metadata, providers
src/features/    — posts, tags, series, search, views, comments, theme, lightbox, about
src/shared/      — components, ui(shadcn), styles, seo, config, utils, hooks, types, modules
contents/        — MDX 콘텐츠 (Git Submodule, 루트)
```

## Commands

```bash
pnpm dev          # 개발 서버 (port 3100)
pnpm build        # 프로덕션 빌드
pnpm lint         # ESLint
pnpm format       # Prettier 포매팅
pnpm test         # Vitest (Unit + Integration)
pnpm test:e2e     # Playwright E2E
```

## Key Decisions

- SSG-first. 런타임 CMS·서버 검색·클라이언트 캐시(TanStack Query) 도입하지 않음
- TDD (Red→Green→Refactor) + Testing Trophy (Integration ~60%)
- Page-First Skeleton: M1에서 더미 데이터로 전 페이지 UI 완성 후 단계적 실데이터 교체

## AI 협업 (하네스)

이 프로젝트에는 15개 전문 에이전트·15개 스킬·17개 규칙으로 구성된 **컴파운드 엔지니어링 하네스**가 구축되어 있다. `"M0-01 진행해줘"`, `"검색 기능 만들어줘"`, `"React 19 포스트 작성해줘"`, `"Week 0 GC"` 같은 자연어 요청만으로 Feature·Content·GC·Docs 4개 트랙 중 하나로 자동 분류되어 **PLAN→EXECUTE→REVIEW(핑퐁 3회)→VALIDATE→DOCUMENT** 사이클이 돌아간다. 현재 마일스톤 진행률은 `docs/TASKS.md`를 참조. 상세 동작은 `docs/AI_WORKFLOW_GUIDE.md` 참조.

**자율 범위 경계** (`.claude/rules/autonomy.md`): `src/`·테스트·`docs/TASKS.md` 체크박스·`CHANGELOG.md`는 자동, 의존성/아키텍처/PRD/Git 쓰기는 **반드시 사용자 승인**.

**Git 브랜치 전략** (`.claude/rules/workflow.md`): 기본 통합 브랜치는 **`develop`**, 마일스톤당 `feature/M{n}-*` 브랜치 1개. 새 마일스톤 첫 태스크 진입 시 orchestrator가 리모트 최신 `develop`으로부터 브랜치 생성 제안 → 사용자 승인 후 실행. 마일스톤 완료 시 `milestone-gate` PASS → `develop`으로 PR. `main`은 프로덕션 릴리스 전용.

## Progressive Disclosure

작업에 필요한 상세 문서를 아래에서 찾아 읽을 것. 모든 정보를 한번에 읽지 말고 현재 태스크에 관련된 문서만 참조.

| 문서                        | 용도                                                                                                                                                                                               |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/TASKS.md`             | 현재 진행할 태스크 체크리스트 (M0~M7)                                                                                                                                                              |
| `docs/ROADMAP.md`           | 태스크별 상세 — 대응 ID, 검증 기준, Entry/Exit                                                                                                                                                     |
| `docs/PRD_PRODUCT.md`       | 제품 스펙 — FEAT, US, 성공 지표, 비목표                                                                                                                                                            |
| `docs/PRD_TECHNICAL.md`     | 기술 계약 — MOD, RT, ADR, 데이터 모델, 마일스톤                                                                                                                                                    |
| `docs/AI_WORKFLOW_GUIDE.md` | 하네스 동작 원리 — 4개 트랙·6단계 사이클·M0-06 시연·산출물 경로                                                                                                                                    |
| `.claude/rules/*.md`        | 코드 작성 규약 17종 (아키텍처·React·TS·테마·접근성·테스트·MDX·SEO·자율·**No-Fallback**·**Comments** 등)                                                                                            |
| `.claude/agents/**/*.md`    | 15개 에이전트 정의 (컴파운드 사이클에서 자동 호출)                                                                                                                                                 |
| `.claude/skills/*/SKILL.md` | 15개 스킬 — `blog-dev`(오케스트레이터)·`compound-engineering`·`content-writing`·`garbage-collection`·`milestone-gate`·`task-completion` + 보조 SEO 3종(`ai-seo`·`programmatic-seo`·`seo-audit`) 등 |
