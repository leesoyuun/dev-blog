---
name: content-writing
description: |
  MDX 기술 포스트 작성 워크플로우. "포스트 작성해줘", "React 19 글 써줘",
  "시리즈 N편 작성" 등 콘텐츠 생성 요청에 반응.
---

# content-writing 스킬

## 실행 순서

1. 주제·키워드·타겟 독자 파악
2. 초안 작성: `_workspace/draft_{slug}.mdx`
3. `a11y-auditor` 검증 (이미지 alt, 코드 블록 접근성)
4. SEO 최적화 (`seo.md` 기준)
5. 사용자 초안 확인 → 승인 후 `contents/posts/` 이동

## Frontmatter 필수 필드

```yaml
title, description (120자↓), date, tags, published
```

## 콘텐츠 기준

- 실제 동작하는 코드 예시
- 문제 → 해결 → 결론 구조
- H2 이상으로 섹션 구분 (H1은 title)
- 외부 링크에 `target="_blank" rel="noopener noreferrer"`

## 주의

초안은 반드시 `_workspace/`에 먼저 작성. `contents/` 이동은 사용자 승인 후.
