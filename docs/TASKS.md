# TASKS

현재 진행 중인 마일스톤 태스크 체크리스트.

> 에이전트는 완료된 태스크만 `[ ]` → `[x]`로 업데이트. 새 항목 추가는 사용자 승인 필요.

---

## M0: Foundation (기반 구축)

### 프로젝트 초기화

- [x] M0-01: Next.js 16 + TypeScript + Tailwind CSS 4 프로젝트 초기화
- [x] M0-02: 3-layer 디렉토리 구조 생성 (app/ features/ shared/)
- [x] M0-03: ThemeProvider (next-themes) 설정
- [x] M0-04: cn() 유틸리티 생성 (clsx + tailwind-merge)
- [x] M0-05: shadcn/ui 초기화 (base-nova, neutral)
- [x] M0-06: .claude/ 하네스 구성 (rules/ agents/ skills/ hooks/)
- [ ] M0-07: Prettier + ESLint 설정 최종화
- [ ] M0-08: Vitest 테스트 환경 설정
- [ ] M0-09: contents/ Git Submodule 연결

### 공유 타입 정의

- [ ] M0-10: Post 타입 정의 (title, slug, date, tags, series, description)
- [ ] M0-11: Tag, Series 타입 정의

### 사이트 설정

- [ ] M0-12: siteConfig 상수 정의 (URL, author, social links)
- [ ] M0-13: Metadata 기본값 설정

---

## M1: UI Skeleton (페이지 뼈대)

> 더미 데이터로 전 페이지 UI 완성. 실데이터는 M2에서 교체.

- [ ] M1-01: 공통 레이아웃 (Header, Footer, Nav)
- [ ] M1-02: 홈 페이지 레이아웃
- [ ] M1-03: 포스트 목록 페이지
- [ ] M1-04: 포스트 상세 페이지
- [ ] M1-05: 태그 페이지
- [ ] M1-06: 시리즈 페이지
- [ ] M1-07: About 페이지
- [ ] M1-08: 다크모드 토글 컴포넌트

---

## M2: Posts (포스트 기능)

- [ ] M2-01: MDX 파서 구현 (gray-matter + next-mdx-remote)
- [ ] M2-02: getPosts() 서비스 함수
- [ ] M2-03: getPost(slug) 서비스 함수
- [ ] M2-04: 포스트 정렬 (최신순)
- [ ] M2-05: 태그 필터링
- [ ] M2-06: 시리즈 그룹핑

---

## M3: Search (검색)

- [ ] M3-01: 빌드 타임 검색 인덱스 생성 (prebuild script)
- [ ] M3-02: 클라이언트 사이드 검색 UI
- [ ] M3-03: 검색 결과 하이라이팅

---

## M4: SEO & Performance

- [ ] M4-01: generateMetadata 전 페이지 적용
- [ ] M4-02: OG 이미지 동적 생성
- [ ] M4-03: sitemap.xml 생성
- [ ] M4-04: robots.txt
- [ ] M4-05: 구조화 데이터 (Article, Blog schema)

---

## M5: Views & Comments

- [ ] M5-01: 조회수 기능 (Vercel KV)
- [ ] M5-02: 댓글 기능

---

## M6: Lightbox & UX

- [ ] M6-01: 이미지 라이트박스
- [ ] M6-02: 코드 블록 복사 버튼
- [ ] M6-03: 목차 (TOC) 사이드바

---

## M7: Production

- [ ] M7-01: Vercel 배포 설정
- [ ] M7-02: 커스텀 도메인
- [ ] M7-03: Analytics
- [ ] M7-04: 성능 최적화 (Core Web Vitals)
