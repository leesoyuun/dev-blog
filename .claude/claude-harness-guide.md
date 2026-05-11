# Claude Code 멀티 에이전트 하네스 가이드

dev-blog 프로젝트의 Claude Code 활용 패턴을 다른 프로젝트에 적용하기 위한 참조 문서.

---

## 1. 핵심 개념

사용자가 자연어 한 줄을 입력하면, 내부에서 전문 에이전트 팀이 자동 구성되어 품질 사이클을 돌린다.

```
"기능 만들어줘"
    ↓
진입 스킬(오케스트레이터) 트리거
    ↓
트랙 분류 → 팀 구성 (TeamCreate)
    ↓
PLAN → EXECUTE → REVIEW → VALIDATE → DOCUMENT → SYNTHESIZE
    ↓
사용자에게 결과 보고
```

---

## 2. .claude/ 디렉토리 구조

프로젝트 루트에 `.claude/` 디렉토리를 두고 모든 하네스 자산을 관리한다.

```
.claude/
├── agents/              # 전문 에이전트 정의 (*.md)
│   ├── orchestration/   # 오케스트레이터
│   ├── developer/       # 구현 전문가
│   ├── quality/         # 리뷰어, 테스터, QA
│   ├── content/         # 콘텐츠 작성
│   └── documentation/   # 문서 생성
│
├── skills/              # 스킬 정의 (SKILL.md)
│   └── {skill-name}/
│       ├── SKILL.md     # 스킬 명세
│       └── references/  # 참조 자료
│
├── rules/               # 코드 작성 규약 (*.md)
│
├── commands/            # 슬래시 커맨드 (*.md)
│   ├── git/
│   ├── test/
│   └── docs/
│
├── hooks/               # 훅 스크립트 (*.sh)
│   ├── mark-lint-needed.sh
│   └── post-stop-lint.sh
│
├── plans/               # 플랜 저장 디렉토리
└── settings.json        # MCP 권한·훅 연결
```

---

## 3. settings.json

MCP 서버 권한과 훅을 연결하는 핵심 설정 파일.

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "enableAllProjectMcpServers": true,
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/mark-lint-needed.sh",
            "timeout": 5
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/post-stop-lint.sh",
            "timeout": 120
          }
        ]
      }
    ]
  },
  "permissions": {
    "allow": [
      "mcp__context7",
      "mcp__playwright",
      "mcp__sequential-thinking",
      "mcp__serena"
    ],
    "ask": [],
    "deny": []
  },
  "plansDirectory": ".claude/plans/"
}
```

### 훅 동작 방식

| 훅 | 트리거 | 동작 |
|----|--------|------|
| `PostToolUse(Edit\|Write)` | 파일 수정 시마다 | lint 필요 플래그 파일 생성 |
| `Stop` | 세션 종료 시 | 누적된 파일에 대해 lint 1회 실행 |

→ 매 수정마다 lint를 실행하지 않고, **세션 종료 시 한 번만** 실행해 속도를 유지하는 패턴.

---

## 4. .mcp.json (MCP 서버)

프로젝트 루트에 위치. 어떤 외부 도구를 연결할지 정의.

```json
{
  "mcpServers": {
    "context7": {
      "type": "http",
      "url": "https://mcp.context7.com/mcp"
    },
    "playwright": {
      "args": ["@playwright/mcp@latest"],
      "command": "npx"
    },
    "sequential-thinking": {
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"],
      "command": "npx"
    },
    "serena": {
      "args": ["--from", "git+https://github.com/oraios/serena", "serena", "start-mcp-server", "--context", "ide-assistant", "--project", "/path/to/your/project"],
      "command": "uvx"
    }
  }
}
```

### 주요 MCP 서버 용도

| MCP | 용도 |
|-----|------|
| `context7` | 라이브러리 최신 API 실시간 조회 |
| `playwright` | E2E 자동 검증, 스크린샷 |
| `sequential-thinking` | 복잡한 문제 단계별 분해 |
| `serena` | 심볼 기반 리팩토링, 참조 추적 (LSP) |
| `shadcn` | shadcn/ui 컴포넌트 자동 추가 |
| `vercel` | 배포 상태·로그 조회 (읽기 전용) |

---

## 5. 스킬 시스템

### 스킬이란?

Claude Code가 특정 패턴의 자연어를 인식하면 자동으로 활성화되는 워크플로우 정의.

### SKILL.md 구조

```markdown
---
name: my-orchestrator
description: |
  사용자가 "M0-01 진행해줘", "기능 만들어줘" 같이 개발 작업을 요청할 때 트리거.
  (description에 트리거 패턴을 명시해야 Claude가 자동 인식)
---

# 스킬 명세

## 역할
오케스트레이터. 입력을 분석해 트랙을 분류하고 팀을 구성한다.

## 트랙 분류
- Feature: 코드 구현 요청
- Content: 문서·글 작성 요청
- GC: 정리·청소 요청
- Docs: 문서 동기화 요청

## 실행 절차
1. 입력 분석
2. 관련 문서(TASKS, ROADMAP) 읽기
3. 트랙 결정
4. TeamCreate로 팀 구성
5. compound-engineering 사이클 실행
6. 결과 통합 후 사용자 보고
```

### 스킬 종류 예시 (dev-blog 기준)

| 스킬 | 역할 |
|------|------|
| `blog-dev` | 메인 오케스트레이터 (모든 자연어 진입) |
| `compound-engineering` | 6단계 품질 사이클 정의 |
| `content-writing` | MDX 포스트 작성 워크플로우 |
| `milestone-gate` | 마일스톤 완료 검증 |
| `task-completion` | 태스크 완료 시 문서 갱신 |
| `garbage-collection` | 코드·문서 정화, 하네스 평가 |
| `nextjs-best-practices` | Next.js 참조 지식 |
| `typescript-expert` | TypeScript 참조 지식 |

---

## 6. 에이전트 시스템

### 에이전트란?

특정 역할에 특화된 전문가. 오케스트레이터가 `Agent()` 호출로 소환.

### 에이전트 정의 파일 구조 (*.md)

```markdown
# nextjs-app-router-expert

## 역할
Next.js App Router 구현 전담. RSC, 라우팅, 데이터 페칭 담당.

## 주요 책임
- `src/app/` 라우팅 구현
- Server Component 패턴 적용
- generateStaticParams, generateMetadata 작성

## 참조 규칙
- .claude/rules/react.md
- .claude/rules/typescript.md
- .claude/rules/project-structure.md

## 출력 형식
- 구현 완료 후 SendMessage(orchestrator, "EXECUTE done: {파일 목록}")
- 산출물: _workspace/execute_{task}_logic.md
```

### 에이전트 팀 구성 패턴

태스크 유형에 따라 팀 조합이 달라진다.

| 태스크 유형 | 팀 조합 |
|------------|---------|
| UI 컴포넌트 | 마크업 전문가 + 리뷰어 + a11y 감사자 |
| 페이지 라우팅 | 앱라우터 전문가 + 리뷰어 + QA |
| 서비스·유틸 | 앱라우터 전문가 + 리뷰어 + 테스터 |
| MDX 콘텐츠 | 콘텐츠 엔지니어 + SEO 감사자 + a11y 감사자 |

---

## 7. 규칙 시스템 (rules/)

### 규칙이란?

에이전트가 코드를 작성·검토할 때 참조하는 프로젝트 고유 컨벤션. CLAUDE.md의 글로벌 가이드라인보다 **프로젝트 특화 규약**을 여기에 기록.

### 권장 규칙 파일 목록

```
.claude/rules/
├── project-structure.md   # 디렉토리 구조, import 규칙
├── react.md               # React 컴포넌트 패턴
├── typescript.md          # TS strict 규약, any 금지
├── styling.md             # CSS/Tailwind 패턴
├── testing.md             # 테스트 작성 기준
├── a11y.md                # 접근성 WCAG 규약
├── seo.md                 # 메타데이터, OG, sitemap
├── comments.md            # 주석 작성 기준 (기본: No comments)
├── no-fallback.md         # try/catch 빈값 반환 금지
├── autonomy.md            # 자율 실행 vs 승인 필수 경계
├── workflow.md            # 브랜치 전략, 커밋 규칙
└── review-discipline.md   # REVIEW 단계 강제 규칙
```

### 핵심 규칙 요약

**comments.md** — 주석은 기본값 없음. WHY가 비명시적일 때만 한 줄.

**no-fallback.md** — try/catch 후 빈 값 반환 금지. 에러 발생 자체를 불가능한 설계로.

**autonomy.md** — 자율 실행 허용 범위와 사용자 확인 필수 범위를 명시.

**review-discipline.md** — EXECUTE 직후 DOCUMENT로 직행 금지. REVIEW 단계 생략 불가.

**workflow.md** — Git 쓰기 작업(commit/push/PR)은 사용자 명시 요청 시에만.

---

## 8. 6단계 품질 사이클 (compound-engineering)

```
PLAN
  └─ 요구사항 분석, 의존성 확인, 변경 파일 목록 작성
     산출물: _workspace/plan_{task}_analysis.md

EXECUTE (병렬)
  └─ 구현 에이전트 + 테스트 에이전트 동시 실행
     산출물: _workspace/execute_{task}_logic.md

REVIEW (핑퐁, 최대 3회)
  └─ 3-way 병렬 리뷰 (코드 리뷰어 + a11y 감사자 + 품질 리뷰어)
     PASS / FIX / ESCALATE 판정
     FIX → 수정 → 재검수
     산출물: _workspace/review_{task}_iter{N}.md

VALIDATE
  └─ 빌드·테스트 실행, 경계면 QA
     산출물: _workspace/qa_{task}_report.md

DOCUMENT
  └─ TASKS.md 체크박스 업데이트, CHANGELOG 항목 추가
     산출물: _workspace/docs_update_{date}.md

SYNTHESIZE
  └─ 전체 사이클 요약, 사용자 보고
     산출물: _workspace/synthesize_{task}_summary.md
```

### 자동 ESCALATE 조건

- REVIEW 3회 후에도 PASS 미획득
- 빌드가 동일 원인으로 3회 이상 실패
- 보안 위반 발견

---

## 9. 자율 범위 경계 (autonomy.md 패턴)

### 자동 실행 허용 (승인 없이)

- `src/` 내부 코드 작성·수정
- 테스트 파일 추가·수정
- 빌드·린트·테스트 실행
- `_workspace/` 중간 산출물 관리
- TASKS.md 체크박스, CHANGELOG 항목 추가
- MCP 읽기 전용 호출

### 반드시 사용자 확인 필요

- 의존성 추가·제거 (package.json)
- 빌드 설정 변경 (next.config, tsconfig, eslint)
- 아키텍처 변경 (새 디렉토리, 경계 조정)
- Git 쓰기 작업 (commit, push, PR 생성)
- 규칙·에이전트·스킬 파일 수정
- 프로덕션 배포 관련 작업

---

## 10. 중간 산출물 관리 (_workspace/)

모든 중간 산출물은 `_workspace/`에 저장하고 `.gitignore`에 추가.

```
_workspace/
├── plan_{task}_analysis.md
├── execute_{task}_logic.md
├── review_{task}_iter{N}.md
├── qa_{task}_report.md
├── docs_update_{date}.md
└── synthesize_{task}_summary.md
```

감사 추적용으로 보존, 30일 경과 시 GC에서 정리.

---

## 11. CLAUDE.md (프로젝트 루트)

Claude가 프로젝트를 열 때 가장 먼저 읽는 파일. 하네스 진입점.

### 권장 구성

```markdown
# 프로젝트명

한 줄 설명.

## Stack
사용 기술 스택 나열.

## Architecture
디렉토리 구조와 레이어 규칙.

## Commands
주요 CLI 명령어.

## Key Decisions
핵심 기술 결정 사항.

## AI 협업 (하네스)
하네스 개요, 자율 범위 경계, Git 브랜치 전략 요약.

## Progressive Disclosure
| 문서 | 용도 |
작업에 필요한 문서만 그때그때 참조하도록 목록 제공.
```

---

## 12. 새 프로젝트에 적용하는 순서

1. **CLAUDE.md** 작성 — 프로젝트 개요, 스택, 아키텍처, 하네스 개요
2. **`.claude/rules/`** 작성 — 프로젝트 규약 (autonomy, workflow, no-fallback은 필수)
3. **`.mcp.json`** 작성 — 필요한 MCP 서버 연결
4. **`.claude/settings.json`** 작성 — MCP 권한, 훅 연결
5. **`.claude/hooks/`** 작성 — 지연 린팅 스크립트
6. **`.claude/agents/`** 작성 — 역할별 에이전트 정의
7. **`.claude/skills/`** 작성 — 오케스트레이터 스킬부터 시작
8. **`_workspace/`** 디렉토리 생성 + `.gitignore` 추가
9. **`docs/TASKS.md`** 등 프로젝트 문서 작성

### 최소 구성 (처음 시작할 때)

복잡한 멀티 에이전트 구조 없이도 핵심 패턴만 적용 가능:

```
.claude/
├── rules/
│   ├── autonomy.md       ← 자율 범위 경계 (필수)
│   ├── workflow.md       ← Git 쓰기 금지 규칙 (필수)
│   └── no-fallback.md    ← 안티패턴 차단 (권장)
├── settings.json         ← 훅 연결
└── hooks/
    └── post-stop-lint.sh ← 세션 종료 시 lint
CLAUDE.md                 ← 프로젝트 개요 (필수)
.mcp.json                 ← MCP 서버 (선택)
```

---

## 13. 핵심 설계 원칙

- **Git 쓰기는 항상 사용자 승인** — commit, push, PR은 자동 실행 금지
- **REVIEW 단계는 생략 불가** — EXECUTE 직후 DOCUMENT 직행 차단
- **fallback 안티패턴 금지** — 에러를 숨기지 말고, 에러가 발생 불가능한 설계로
- **주석은 기본값 없음** — WHY가 비명시적일 때만 한 줄
- **자가진화** — 반복 실수 3회+ 발견 시 규칙 파일에 추가 (사용자 승인 후)
- **Progressive Disclosure** — 모든 문서를 한 번에 읽지 않고, 현재 태스크에 필요한 것만
