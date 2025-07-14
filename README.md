# ARTINUS – 프론트엔드 개발 과제

 **기술 스택** 
 - Next.js 15 (App Router)
 - React 19
 - TypeScript 5
 - Tailwind CSS 3
 - Headless UI
 - Vercel


## 데모 링크

배포 주소 : [https://artinus-project.vercel.app](https://artinus-project.vercel.app)

Github Repository URL : [https://github.com/dldydrl119/artinus-project](https://github.com/dldydrl119/artinus-project)

## 프로젝트 구조

```
├─ app/                      # App Router 기반 페이지 구조
│  ├─ page.tsx               # 메인 페이지 (Suspense + 클라이언트 훅)
│  ├─ home-content.tsx       # 클라이언트 컴포넌트 – 리스트 + 무한 스크롤
│  ├─ [id]/                  # 상품 상세 페이지 (동적 라우팅)
│  │  ├─ page.tsx
│  │  └─ loading.tsx         # 상세페이지 로딩 Skeleton UI
│  └─ layout.tsx             # 전체 레이아웃 (헤더·푸터 포함)
├─ components/               # 공통 UI 컴포넌트
├─ types/                    # 타입 정의 (Product 등)
├─ public/                   # 정적 파일
└─ next.config.js            # 이미지 원격 도메인 설정
```


## 실행 방법

```bash
# 1. 프로젝트 클론
$ git clone https://github.com/dldydrl119/artinus-project.git
$ cd artinus-project

# 2. 의존성 설치
$ npm install

# 3. 개발 서버 실행
$ npm run dev  # http://localhost:3000

# 4. 빌드 및 실행 (프로덕션)
$ npm run build && npm start
```


## 구현 기능 요약

| 기능             | 설명                                                        |
| -------------- | --------------------------------------------------------- |
| **상품 리스트**     | 20개씩 페이지네이션 + 무한 스크롤 (IntersectionObserver + debounce 적용) |
| **카테고리 필터링**   | 사이드바 고정 메뉴, URL 쿼리(`?category=`)와 동기화                     |
| **정렬 기능**      | 가격 오름차순/내림차순, 평점순 정렬 (Headless UI Listbox 사용)             |
| **상품 카드 컴포넌트** | Lazy Loading 이미지, 가격은 원화(₩)로 환산 처리                        |
| **상세 페이지**     | 썸네일/이미지 리스트, 설명/태그/가격, Skeleton Loading UI 포함             |
| **로딩 UX**      | 리스트: Spinner / 상세: Skeleton 표시                            |
| **반응형 디자인**    | 모바일\~데스크탑 대응 (Tailwind CSS Grid + Flex 기반)                |
| **정적 배포**      | Vercel Static Output + remotePatterns 설정 이미지 최적화          |


## 기술 스택 및 선택 이유

* **Next.js 15 App Router**: 최신 라우팅 시스템 기반 구조, 동적 세그먼트 대응
* **Suspense 처리**: `useSearchParams()` 이슈 대응 위해 Suspense로 클라이언트 컴포넌트 분리
* **서버/클라이언트 분리**: 데이터 fetch는 서버 컴포넌트, 인터랙션은 클라이언트
* **무한 스크롤 최적화**: IntersectionObserver + debounce 로 불필요한 요청 방지
* **Tailwind JIT**: 클래스 단위 tree-shaking → 빌드 최적화
* **이미지 최적화**: next/image + remotePatterns 사용


## 테스트 및 린트

* 기본 ESLint 적용 (`next lint`)
* Playwright / Jest 등 테스트 프레임워크는 추후 확장 가능 (과제 범위 외)


## 회고 및 개선 여지

* **Next.js 15로 작업한 첫 경험**이라 `params` 비동기 처리나 Suspense 처리에 시간이 소요되었지만 문서를 참고하며 대응했습니다.
* 무한 스크롤 동작 안정성 확보를 위해 debounce와 observer 조건을 조절했습니다.
* 전체 스타일은 미니멀하게 구성했고 추후에는 **카테고리 + 정렬 동시 필터**, **Skeleton 개선**, **테스트 코드 추가**로 확장 가능을 고려했습니다.



