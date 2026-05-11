---
name: blog-dev
description: |
  사용자가 개발·구현·태스크 실행을 요청할 때 트리거되는 메인 오케스트레이터 스킬.
  "M0-01 진행해줘", "기능 만들어줘", "검색 기능 구현", "포스트 작성해줘",
  "Week N GC", "문서 동기화" 등 모든 개발 자연어 요청에 반응한다.
---

# blog-dev 스킬

## 역할

자연어 요청을 받아 트랙을 분류하고 compound-engineering 사이클을 구동하는 메인 오케스트레이터.

## 트랙 분류 로직

```
입력 분석
  ├── 태스크 ID 포함 (M{n}-{id}) → Feature 트랙
  ├── 코드/기능 구현 요청 → Feature 트랙
  ├── 포스트/글 작성 요청 → Content 트랙
  ├── GC/정리/Week N GC → GC 트랙
  └── 문서/Docs 동기화 → Docs 트랙
```

## 실행 순서

1. `docs/TASKS.md` 로드 → 현재 마일스톤 파악
2. 트랙 결정 → 팀 구성
3. `compound-engineering` 스킬 호출
4. 결과 통합 → 사용자 보고

## 팀 구성 (트랙별)

| 트랙 | 팀 |
|------|-----|
| Feature | nextjs-app-router-expert + markup-specialist + code-reviewer + a11y-auditor + qa-tester + docs-updater |
| Content | content-engineer + a11y-auditor + docs-updater |
| GC | code-reviewer + docs-updater |
| Docs | docs-updater |

## 자율 범위

`autonomy.md` 준수 필수. 의존성·아키텍처·Git 쓰기는 사용자 승인 대기.
