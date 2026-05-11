---
description: 개발 워크플로우 및 문제 해결 원칙
---

# 개발 워크플로우

- Pre-commit: lefthook + Lint-staged (자동 린팅/포매팅)
- 커밋: 명시적 요청 시에만, 작은 단위로

## 브랜치 전략 (Git Flow Lite)

**기본 통합 브랜치는 `develop`**. `main`은 프로덕션 릴리스 전용이다.

```
main       ← 프로덕션 릴리스 (보호 브랜치)
  ↑
develop    ← 기본 통합 브랜치, 모든 feature PR의 base
  ↑
feature/M{n}-{slug}  ← 마일스톤 단위 개발 브랜치
```

### 마일스톤 단위 브랜치 규칙

1. **1 마일스톤 = 1 feature 브랜치**
   - 브랜치 이름: `feature/M{n}-{슬러그}` (예: `feature/M0-foundation`, `feature/M1-ui-skeleton`)
   - 해당 마일스톤의 **모든 태스크**가 이 브랜치 위에서 순차 커밋된다
   - 태스크마다 브랜치를 새로 파지 않는다 (과도한 PR 방지)

2. **새 마일스톤의 첫 태스크 진입 시** 브랜치 생성 절차 (반드시 이 순서):

   ```bash
   git checkout develop
   git fetch origin
   git pull origin develop         # 리모트 최신 develop 동기화 필수
   git checkout -b feature/M{n}-{슬러그}
   ```

   - **리모트 최신 develop 기반**이 아니면 진행하지 않는다. 로컬 develop이 뒤처진 상태에서 브랜치를 따면 나중에 PR 머지 충돌 누적.

3. **마일스톤 완료 시** PR 생성:
   - 대상 마일스톤의 모든 TASKS 항목이 `[x]`
   - `milestone-gate` 스킬이 PASS 판정
   - `garbage-collection` 스킬 완료
   - **사용자 명시 요청 시**에만 `gh pr create --base develop --head feature/M{n}-*` 실행
   - PR 제목: `feat: M{n} {마일스톤명} 완료` (예: `feat: M0 Foundation 완료`)

4. **PR 머지 후 정리**:
   - 머지 전략: **merge commit** 또는 **rebase merge** (squash merge 금지 — 아래 "Squash merge 금지" 섹션 참조)
   - 로컬에서 `git checkout develop && git pull origin develop && git branch -d feature/M{n}-*`
   - 원격 브랜치는 GitHub 머지 시 자동 삭제

### 오케스트레이터의 브랜치 체크 로직

`blog-dev` 오케스트레이터는 태스크 실행 **Phase 1 직후**에 브랜치 상태를 확인한다:

```
현재 브랜치 확인 (git rev-parse --abbrev-ref HEAD)
│
├── feature/M{n}-*  (태스크의 마일스톤과 일치)
│   └── 그대로 진행
│
├── feature/M{k}-*  (다른 마일스톤 브랜치)
│   └── 경고: "지금 {k} 브랜치에 있는데 {n} 태스크 요청입니다. 확인?"
│   └── AskUserQuestion
│
├── develop or main
│   └── "새 마일스톤 시작. feature/M{n}-* 생성 필요. 실행?"
│   └── AskUserQuestion → 승인 시 위 "브랜치 생성 절차" 실행
│
└── 기타 (예: 기존 다른 feature 브랜치)
    └── 사용자에게 상황 보고 후 중단
```

**실제 `git checkout`/`git pull`은 사용자 승인 후에만 실행** (아래 "커밋/PR 절대 금지 규칙" 참조).

### 커밋 단위 규칙

- 마일스톤 브랜치 안에서는 **태스크 단위 커밋** (한 태스크 = 한 커밋 원칙)
- 커밋 메시지: `<type>: <요약>` — **scope(괄호 표기) 금지**. 태스크 ID는 커밋 body에 기록.
  - 예: `feat: cn() 유틸리티 추가`, `docs: M0 진행률 갱신`
  - 금지: `feat(M0-06): …`, `feat(search): …` — 1인 블로그에 scope는 불필요한 노이즈.
  - type: `feat`·`fix`·`docs`·`chore`·`refactor`·`test`·`style` 중 택1.
  - body(bullet list)에 관련 태스크 ID(`M0-06`)와 변경 근거 명시.
- 여러 태스크를 묶어 커밋하지 않는다 — `git log`로 태스크 이력을 역추적 가능해야 한다. (같은 파일에 걸친 태스크는 예외 허용, body에 모든 ID 기재)

## ⛔ 커밋/PR 절대 금지 규칙

**코드 수정 후 절대로 자의적으로 커밋하거나 PR을 생성하지 않는다.**

- `git commit`, `git push`, `gh pr create`, `git checkout -b`, `git pull` 등 모든 git 쓰기 작업은 사용자의 **명시적 요청** 시에만 실행한다
- "커밋해줘", "/git:commit", "/git:pr", "/git:branch" 등 직접 요청 없이는 코드만 수정하고 대기한다
- **오케스트레이터의 브랜치 체크 로직도 예외 없음** — "새 마일스톤 시작이니 브랜치 만들까요?" 같은 `AskUserQuestion`으로만 제안하고, 실제 명령은 승인 후 실행
- 대화가 재시작(context 압축 후 재개)되어도 이 규칙은 동일하게 적용된다
- 이전 대화에서 커밋을 진행했다고 해서 현재 대화에서도 자동으로 커밋하는 것은 금지된다

## ⛔ Squash merge 금지

**PR 머지 시 squash merge 사용 금지.** merge commit (Create a merge commit) 또는 rebase merge (Rebase and merge)만 사용한다.

### Why

- **Graph 연속성 유지** — squash로 압축하면 main이 develop의 atomic commit history를 잃어버려, 다음 PR 생성 시 `develop`이 main의 graph ancestor가 아닌 상태가 된다 → conflict 폭주.
- **PR #31·#32·#33·#34 모두 squash로 진행되어 매 PR마다 conflict 사전 해소 작업 반복** (회고: 2026-05-07 사용자 명시 짜증 표현, memory `feedback_no_squash_merge`).
- **Atomic commits 보존** — `git log`·`git blame`으로 변경 의도 추적 가능. squash는 4건의 변경을 1건으로 압축해 history 손실.

### How to apply

1. PR 본문에 "**merge commit 또는 rebase merge로 머지 부탁드립니다 (squash 금지)**" 명시 (release PR template).
2. `gh pr merge` CLI 사용 시 `--merge` 또는 `--rebase` 플래그 명시. 절대 `--squash` 사용 금지.
3. GitHub UI에서 머지 시 **"Create a merge commit"** 또는 **"Rebase and merge"** 선택. **"Squash and merge"** 금지.
4. 사용자가 직접 "squash로 머지해줘"라고 명시하지 않는 한 squash 옵션 제안하지 않는다.

### 예외

- **사용자 명시 요청** 시에만 squash 가능 (예: "이 PR은 squash로 머지해줘"). 그 경우에도 1회 한정 + 다음 PR부터 본 룰 복구.

## PR 생성 전 base 브랜치 동기화 필수

**`develop → main` PR 생성 전 반드시 `origin/main`을 develop에 먼저 merge해서 conflict 사전 해소.** 예외 없음.

### Why

- squash merge로 main이 develop의 ancestor가 아닌 상태이므로, 새 PR 생성 시 GitHub이 conflict 표시 → 사용자가 매 PR마다 conflict 만남.
- PR #32·#33·#34 모두 동일 패턴 반복 → 사용자 명시 짜증 (2026-05-07 "자꾸 컴플릭트나잖아 반복되는 실수 자제좀해줘").

### How to apply

1. PR 생성 직전 develop에서:
   ```bash
   git fetch origin main
   git merge origin/main          # conflict 발생 시 develop이 superset이므로 git checkout --ours로 일괄 채택
   git add CHANGELOG.md package.json src/...
   git commit -m "merge: origin/main(...) 흡수 — develop이 superset이므로 모든 conflict develop 측 채택"
   git push origin develop
   ```
2. **그 후에야** `gh pr create --base main --head develop` 실행.
3. PR 본문에 "merge: origin/main 흡수" merge commit이 같이 보이는 게 정상.

### 검증

PR 생성 직후 `gh pr view {id} --json mergeable,mergeStateStatus`로 `MERGEABLE` 확인. `CONFLICTING` 또는 `BLOCKED`면 위 절차 누락 또는 push 실패.

# 문제 해결 원칙

- 근본 원인 분석 후 해결
- 의미 없는 타이머(setTimeout/setInterval)로 이슈 우회 금지
- 임시 플래그 변수 선언으로 이슈 우회 금지
