# ARTINUS Frontend – DummyJson Products Catalog

> **과제 목표**  
> DummyJson Products API를 연동해 **상품 목록**·**상세 페이지**를 구현하고
> 무한 스크롤·로딩 UX·정적 배포까지 적용한 SPA를 제작

---

## 1. 개발 환경

| 항목 | 버전 / 스택 |
| :-- | :-- |
| Node | **22.x** |
| 패키지 매니저 | **npm 10.x** |
| 프레임워크 | **Next.js 15 (App Router + Turbopack)** |
| 스타일 | **Tailwind CSS 3.4**, Headless UI, Heroicons |
| 타입·린트 | TypeScript 5, ESLint 9 |
| 기타 | lodash.debounce (무한 스크롤 최적화) |

---

## 2. 프로젝트 구조 (핵심 파일)

```text
.
├─ app/
│  ├─ [id]/
│  │  ├─ loading.tsx        # 상세 Skeleton (RSC)
│  │  └─ page.tsx           # 상품 상세 (SSR, force-dynamic)
│  ├─ layout.tsx            # 전역 레이아웃 (Header / Footer)
│  ├─ page.tsx              # 상품 리스트 + Lazy Load
│  └─ globals.css           # Tailwind base
│
├─ components/
│  ├─ Header.tsx            # 상단 내비
│  ├─ Footer.tsx            # 하단 정보
│  ├─ SidebarCategory.tsx   # 좌측 카테고리 필터
│  ├─ SortingDropdown.tsx   # 정렬 드롭다운
│  ├─ ProductCard.tsx       # 목록 카드
│  └─ LoadingSpinner.tsx    # 공통 스피너
│
├─ types/product.ts         # Product · RouteParams 타입
├─ tailwind.config.ts
├─ next.config.ts           # remote image 패턴
└─ ...
```



---

## 3. 주요 개발 내용

### 3-1. 리스트 페이지 (`/`)
- **API**: `GET /products?limit=20&skip=n`  
- **카드형 그리드** (1 → 4 열 반응형)  
- **20개 단위 무한스크롤** `IntersectionObserver + debounce(150 ms)`  
- **카테고리 필터** (URL `?category=`), **정렬** (가격·평점)  
- **로딩 UX**: 하단 `<LoadingSpinner/>` 표시

### 3-2. 상세 페이지 (`/[id]`)
- **API**: `GET /products/{id}`  
- 좌측 썸네일 / 우측 정보 분할 레이아웃  
- 출력 필드: `thumbnail`, `title`, `price → KRW 환산`, `tags`  
- 404 처리: `notFound()`  
- 스켈레톤: `app/[id]/loading.tsx`

### 3-3. 공통
| 항목 | 구현 방법 |
|------|-----------|
| 로딩 표시 | 리스트 - Spinner, 상세 - Skeleton |
| 빌드 최적화 | Turbopack + Tailwind JIT → Tree-shaking & PurgeCSS |
| 이미지 최적화 | `next/image` + 원격 도메인 whitelisting |
| 코드 분리 | Server vs Client Component 적절히 구분 |
| i18n 간단 적용 | 한글 UI 텍스트, 가격 원화 표시 |

> **정적 배포(SSG)**  
> 현재 구조는 SSR 우선이지만, `generateStaticParams()` 추가 시 상품 상세를 SSG/ISR로 쉽게 전환 가능.  

---

## 4. 빌드 & 실행 가이드


### 의존성
npm ci          # 또는 npm install

### 개발
npm run dev     # http://localhost:3000

### 프로덕션 빌드
npm run build
npm start       # 기본 3000 포트

## 5. 배포 URL
❗ 예시: https://artinus-demo.vercel.app
(Vercel 1-click deploy – SSR 캐시 전략 포함)

## 6. 기술 선택 / 설명
항목	선택 이유
Next.js 15 App Router	Server/Client 구분, SEO, React 19 지원
Turbopack dev 서버	초기 컴파일 70 %↓
Tailwind 3	디자인 시스템 빠른 구축, Purge 기본
Headless UI	접근성 + 디자인 자유도 확보
lodash.debounce	Observer 연쇄 호출 차단
TypeScript	타입 안정성, 유지보수
RSC Skeleton	LCP 향상, UX 일관

## 7. 요구사항 충족 체크
요구항목	결과
리스트 20개 페이징	✅ limit=20, skip=n
카드/리스트 UI	✅ 카드형 그리드
Lazy Load	✅ Observer + Debounce
상세 API 연동	✅
필수 필드 (thumbnail, title, price, tags)	✅
로딩 UI	✅
파일 최적화 & 캐싱	✅ (Turbopack/Next Image)
정적 배포 옵션	✅ next export 가능

## 8. 향후 개선 로드맵 (자유 구현)
상품 SSG + ISR → generateStaticParams / revalidate 적용

다크모드 토글 (next-themes)

검색 & 정렬 서버측 연동 API

장바구니 상태관리 (React Context + localStorage)

E2E 테스트 (Playwright)

🎉 감사합니다.
과제 리뷰 중 궁금하신 부분은 언제든 편하게 연락 주세요.