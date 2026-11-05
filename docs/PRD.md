# [PRD] 링크트리 클론 서비스: 마이링크 (MyLink)

---

## 1. 프로젝트 개요 (Overview)

- **서비스명**: 마이링크 (MyLink)
- **한 줄 정의**: 크리에이터와 1인 브랜드를 위한 실시간 반응형 다중 링크 프로필 서비스
- **구동 환경**: 클라이언트 전용 데모 (LocalStorage 및 Mock Data 기반 독립 구동 SPA)
- **핵심 기술 스택**:
  - **프레임워크**: React 19 / Next.js 16 (App Router)
  - **디자인 시스템**: **shadcn/ui** (Preset `b7WQbDtnU`, Base Color `taupe`, Tailwind CSS v4)
  - **아이콘**: Lucide React
  - **전역 상태 관리**: **Zustand** (`persist` 미들웨어를 통한 `localStorage` 자동 영속화)
- **단계별 개발 전략**:
  - 🎯 **Phase 1 (현재 목표 - 시연용 MVP)**: **LocalStorage 기반 프로필 페이지 및 기본 링크/블록 렌더링 & 편집**
  - ⏳ **Phase 2 (차기 개발)**: 대시보드 및 통계/애널리틱스 (조회수, 클릭 트래킹, CTR 집계)
  - ⏳ **Phase 3 (확장)**: 드래그 앤 드롭 순서 변경 고도화, 미디어 임베드

---

## 2. 타깃 고객 및 핵심 시나리오 (Target & User Scenario)

### 2.1 타깃 고객 (Primary Target)
- **SNS 크리에이터 / 인플루언서 / 1인 창작자**
  - 여러 채널(인스타그램, 유튜브, 블로그, 포트폴리오 등)을 하나의 모바일 최적화 링크 페이지로 묶어 제공하고자 하는 사용자

### 2.2 사용자 시나리오 (User Scenarios)

#### 👤 1. 방문자 관점 (Visitor Scenario)
1. **페이지 진입**: **사용자는** 크리에이터의 다양한 활동 채널과 콘텐츠를 한곳에서 확인하기 위해 **SNS 프로필에 등록된 마이링크 URL을 클릭한다.**
2. **프로필 탐색**: **사용자는** 해당 크리에이터가 누구인지 정체성과 최근 소식을 파악하기 위해 **상단의 프로필 아바타 이미지, 닉네임, Bio(소개글)를 확인한다.**
3. **소셜 미디어 바로가기**: **사용자는** 크리에이터의 다른 공식 SNS 채널(유튜브, 인스타그램, 깃허브 등)로 바로 이동하기 위해 **프로필 하단에 배치된 소셜 아이콘을 클릭한다.**
4. **콘텐츠/섹션 탐색**: **사용자는** 자신이 찾고자 하는 링크가 어떤 카테고리에 속해 있는지 구분하기 위해 **섹션 헤더 및 안내 텍스트 블록을 읽는다.**
5. **목적 링크 클릭 및 외부 이동**: **사용자는** 관심 있는 최신 영상, 포트폴리오, 공구 페이지 등으로 이동하기 위해 **원하는 웹 링크 버튼을 클릭하여 새 탭으로 외부 사이트에 접속한다.**

#### 👑 2. 소유자 관점 (Owner / Creator Scenario)
1. **관리 모드 진입**: **사용자는** 자신의 프로필 정보와 링크 목록을 편집하기 위해 **마이링크 관리자/에디터 화면에 접속한다.**
2. **새로운 링크 블록 추가**: **사용자는** 홍보하고 싶은 새로운 웹사이트나 콘텐츠를 프로필에 노출하기 위해 **'링크 추가' 버튼을 누르고 링크 제목과 URL, 아이콘을 입력한다.**
3. **기존 링크 정보 수정**: **사용자는** 오타를 바로잡거나 변경된 최신 주소로 업데이트하기 위해 **수정하려는 링크 블록을 클릭하여 제목이나 URL을 변경한다.**
4. **링크 임시 숨김 (On/Off 토글)**: **사용자는** 링크를 영구 삭제하지 않고 일시적으로 방문자에게 보이지 않게 처리하기 위해 **해당 링크 블록의 활성화(Enable) 토글 스위치를 끈다.**
5. **섹션 헤더/구분선 추가**: **사용자는** 링크가 많아졌을 때 방문자가 쉽게 읽을 수 있도록 그룹별로 나누기 위해 **'헤더 블록' 또는 '구분선(Divider)'을 추가하여 섹션을 분리한다.**
6. **불필요한 링크 삭제**: **사용자는** 기간이 만료되었거나 더 이상 필요 없는 링크를 정리하기 위해 **해당 블록의 삭제(휴지통) 버튼을 눌러 목록에서 제거한다.**
7. **실시간 변경사항 검증 및 자동 저장**: **사용자는** 방문자에게 보여질 실제 모바일 화면의 시각적 완성도를 확인하기 위해 **화면의 프로필 미리보기를 확인하며 LocalStorage에 변경 데이터가 자동으로 영속화되는 것을 확인한다.**

---

## 3. 시스템 아키텍처 & 데이터 흐름 (Phase 1)

```mermaid
graph LR
    subgraph Browser [Client-side Browser]
        State[Zustand Store] -->|실시간 렌더링| ProfileView[마이링크 프로필 뷰어]
        State <-->|자동 영속화 / 로드| Storage[(LocalStorage)]
        Mock[기본 Mock Data] -.->|초기화 시 주입| State
    end
```

- **저장소**: 브라우저 `localStorage` (Key: `mylink-storage`)
- **초기 상태**: 서비스 접속 시 기본 크리에이터 Mock 프로필이 자동 로드됨.
- **초기화 지원**: 언제든 기본 Mock 데이터로 되돌릴 수 있는 '기본값 복원' 액션 제공.

---

## 4. Phase 1 상세 기능 요구사항 (Functional Requirements)

### 4.1 프로필 헤더 영역 (Profile Header)

| 기능 ID | 기능명 | 상세 사양 | 우선순위 |
| :--- | :--- | :--- | :--- |
| **PRF-01** | 프로필 아바타 | 원형 프로필 이미지 (URL 지원, 이미지 없을 시 기본 아바타/이니셜 표시) | **P0 (필수)** |
| **PRF-02** | 닉네임 & 핸들 | 크리에이터 표시 이름(`displayName`) 및 핸들명(`@username`) 표시 | **P0 (필수)** |
| **PRF-03** | Bio (소개글) | 1~3줄의 간단한 자기소개 텍스트 렌더링 | **P0 (필수)** |
| **PRF-04** | 소셜 아이콘 바 | 인스타그램, 유튜브, X(트위터), 깃허브, 이메일 등의 소셜 링크 아이콘 렌더링 | **P0 (필수)** |

---

### 4.2 링크 & 콘텐츠 블록 렌더링 (Blocks)

| 기능 ID | 기능명 | 상세 사양 | 우선순위 |
| :--- | :--- | :--- | :--- |
| **BLK-01** | 웹 링크 버튼 | - 클릭 시 새 탭(`target="_blank"`)으로 URL 열기<br>- 아이콘/썸네일 이미지 지원<br>- 호버(Hover) 및 클릭 인터랙션 애니메이션 | **P0 (필수)** |
| **BLK-02** | 섹션 헤더 블록 | 링크 블록들을 그룹화하는 섹션 제목 텍스트 렌더링 | **P0 (필수)** |
| **BLK-03** | 텍스트/공지 블록 | 간단한 안내 문구나 소개글 텍스트 카드 렌더링 | **P0 (필수)** |
| **BLK-04** | 구분선 (Divider) | 시각적 구분을 위한 디바이더 선 표시 | **P1 (권장)** |
| **BLK-05** | 활성화(Enabled) 필터 | `enabled === true`인 블록만 화면에 노출 | **P0 (필수)** |

---

### 4.3 디자인 & 테마 시스템 (Theme & Styling)

| 기능 ID | 기능명 | 상세 사양 | 우선순위 |
| :--- | :--- | :--- | :--- |
| **THM-01** | 배경 스타일 | 단색 배경(Solid Color) 및 선형 그라디언트(Linear Gradient) 지원 | **P0 (필수)** |
| **THM-02** | 버튼 스타일 | - 모양: 직사각형(Square), 라운드(Rounded), 알약형(Pill)<br>- 스타일: Fill(단색 채우기), Outline(테두리), Shadow(그림자), Glass(유리 효과) | **P0 (필수)** |
| **THM-03** | 텍스트 & 폰트 컬러 | 배경에 맞는 텍스트 가독성 색상(다크/라이트) 적용 | **P0 (필수)** |
| **THM-04** | 모바일 반응형 컨테이너 | 스마트폰 화면 비율(Max-width 480px)로 중앙 정렬된 깔끔한 모바일 뷰 | **P0 (필수)** |
| **THM-05** | **shadcn/ui 기반 UI 아키텍처** | 모든 기본 UI 요소는 shadcn/ui 기반 컴포넌트(Button, Avatar, Card, Separator 등)와 CSS 변수 디자인 토큰(`globals.css`)을 활용하여 일관된 룩앤필 구축 | **P0 (필수)** |

---

### 4.4 [연기됨] Phase 2 기능 목록 (차기 진행)
- ⏸️ **대시보드 종합 요약 카드 (총 조회수, 총 클릭수, CTR)**
- ⏸️ **개별 링크별 클릭 이벤트 집계 및 통계 테이블**
- ⏸️ **복합 에디터 콘솔 & 블록 드래그 앤 드롭 정렬**

---

## 5. 화면 와이어프레임 & UI 스펙 (Wireframe & UI Spec)

### 5.1 모바일 메인 프로필 화면 와이어프레임

```text
┌────────────────────────────────────────────────────────┐
│                        [ 상단 여백 ]                    │
│                                                        │
│                    ┌────────────────┐                  │
│                    │   [ 아바타 ]   │  ← 프로필 이미지  │
│                    │    (88x88)     │     (원형 테두리) │
│                    └────────────────┘                  │
│                                                        │
│                     Alex Kim  ✨       ← displayName   │
│                   @alex_creator        ← username      │
│                                                        │
│       "디지털 프로덕트를 만드는 디자이너 & 개발자"     ← Bio (소개글)  │
│          "매주 유용한 테크 팁을 공유합니다 🚀"         │
│                                                        │
│             [📷]   [▶️]   [✖️]   [🐙]   [✉️]            ← 소셜 아이콘 바│
│                                                        │
│  ────────────────────────────────────────────────────  │
│                                                        │
│   📌 FEATURED & PROJECTS               ← 섹션 헤더 1   │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [🌐]  나의 포트폴리오 웹사이트                     │  │ ← 웹 링크 버튼
│  │       최신 작업물과 케이스 스터디 보러가기        │  │   (아이콘/썸네일
│  └──────────────────────────────────────────────────┘  │    + 제목 + 설명)
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [▶️]  최신 유튜브 영상 보러가기          [NEW] 🔥 │  │ ← 뱃지/강조 링크
│  │       '10분 만에 웹사이트 배포하는 법'           │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│   📢 ANNOUNCEMENT                      ← 섹션 헤더 2   │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 💡 10월 한정 1:1 커피챗 신청을 받고 있습니다.       │  │ ← 안내 텍스트
│  │    궁금한 점은 언제든 아래 링크로 문의주세요!     │  │   (Text Card)
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [☕]  1:1 커피챗 & 멘토링 신청하기                 │  │ ← 웹 링크 버튼
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ┌──────────────────────────────────────────────────┐  │
│  │ [📦]  사이드 프로젝트 템플릿 다운로드              │  │ ← 웹 링크 버튼
│  └──────────────────────────────────────────────────┘  │
│                                                        │
│  ────────────────────────────────────────────────────  │
│                                                        │
│                    🔗 MyLink로 제작됨                  ← 하단 브랜딩 풋터
│                                                        │
└────────────────────────────────────────────────────────┘
```

### 5.2 주요 컴포넌트별 상세 스펙

| 번호 | 컴포넌트 명 | 역할 및 인터랙션 | 디자인 권장 규격 |
| :---: | :--- | :--- | :--- |
| **①** | **프로필 아바타 (Avatar)** | 크리에이터 얼굴/로고 사진 | `w-20 h-20` (80px), 원형(`rounded-full`), 미세한 외곽선 |
| **②** | **프로필 타이틀 & Bio** | 크리에이터 이름(`h1`), 아이디(`@handle`), 1~3줄 소개글 | 가독성 높은 폰트, 중앙 정렬, 줄간격 `leading-relaxed` |
| **③** | **소셜 아이콘 바 (Social Bar)** | 인스타, 유튜브, X, 깃허브, 이메일 등 SNS 다이렉트 링크 | 아이콘 크기 `24px`, 클릭 시 해당 SNS 앱/웹으로 즉시 이동 |
| **④** | **섹션 헤더 (Section Header)** | 하위 링크 그룹의 성격을 안내하는 소제목 | `text-xs font-bold tracking-wider uppercase`, 좌측/중앙 정렬 |
| **⑤** | **웹 링크 카드 (Link Card)** | 핵심 콘텐츠 및 외부 사이트 연결 버튼 | - **모양**: Pill (완전 라운드) 또는 Rounded-xl<br>- **효과**: 마우스 오버 시 미세 확대(`hover:scale-[1.02]`), 그림자 전환<br>- **클릭**: 새 탭(`target="_blank"`)으로 안전하게 이동 |
| **⑥** | **텍스트 카드 (Text Block)** | 공지사항, 간단한 글, 소식 전달 | 반투명 박스 배경(`bg-white/10` 등), 은은한 패딩 |
| **⑦** | **하단 풋터 (Branding Footer)** | 마이링크 브랜딩 로고 | `text-xs opacity-50`, 심플한 로고 텍스트 |

---

## 6. 데이터 스키마 (TypeScript Data Schema)

```typescript
export interface MyLinkProfile {
  username: string;          // e.g. "alex_creator"
  displayName: string;       // e.g. "Alex Kim"
  bio: string;               // e.g. "디지털 크리에이터 & 개발자 🚀"
  avatarUrl: string;         // 프로필 이미지 URL
  socials: {
    instagram?: string;
    youtube?: string;
    twitter?: string;
    github?: string;
    email?: string;
  };
}

export interface MyLinkTheme {
  presetId?: string;
  backgroundType: 'color' | 'gradient';
  backgroundColor: string;   // e.g. "#0f172a"
  gradientStart?: string;    // e.g. "#6366f1"
  gradientEnd?: string;      // e.g. "#a855f7"
  buttonShape: 'square' | 'rounded' | 'pill';
  buttonStyle: 'fill' | 'outline' | 'shadow' | 'glass';
  buttonColor: string;       // e.g. "#ffffff"
  buttonTextColor: string;   // e.g. "#0f172a"
  textColor: string;         // e.g. "#ffffff"
}

export type BlockType = 'link' | 'header' | 'text' | 'divider';

export interface BaseBlock {
  id: string;
  type: BlockType;
  enabled: boolean;
  order: number;
}

export interface LinkBlock extends BaseBlock {
  type: 'link';
  title: string;
  url: string;
  icon?: string;
  thumbnailUrl?: string;
  description?: string;     // 링크 상세 설명 / 서브텍스트
  badge?: string;           // 강조 뱃지 (e.g. "HOT", "NEW", "FREE")
}

export interface HeaderBlock extends BaseBlock {
  type: 'header';
  title: string;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  content: string;
}

export interface DividerBlock extends BaseBlock {
  type: 'divider';
}

export type Block = LinkBlock | HeaderBlock | TextBlock | DividerBlock;

export interface MyLinkStoreData {
  profile: MyLinkProfile;
  theme: MyLinkTheme;
  blocks: Block[];
}
```

### 6.1 기본 Mock 데이터 명세 (Default Mock Data Specification)

서비스 최초 접속 시 또는 '기본값 복원' 실행 시 주입되는 공식 더미 데이터입니다. (`src/mockData.ts`에 정의)

```typescript
export const defaultMockData: MyLinkStoreData = {
  profile: {
    username: "alex_creator",
    displayName: "Alex Kim ✨",
    bio: "디지털 프로덕트를 만드는 풀스택 개발자 & 크리에이터 🚀\n매주 실무 테크 팁과 유용한 생산성 도구를 공유합니다.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    socials: {
      github: "https://github.com/alexkim-dev",
      youtube: "https://youtube.com/@alex_tech",
      twitter: "https://x.com/alexkim",
      instagram: "https://instagram.com/alex.techlife",
      email: "contact@alexkim.dev",
    },
  },
  theme: {
    backgroundType: "gradient",
    backgroundColor: "#0f172a",
    gradientStart: "#3b82f6",
    gradientEnd: "#8b5cf6",
    buttonShape: "pill",
    buttonStyle: "shadow",
    buttonColor: "#ffffff",
    buttonTextColor: "#0f172a",
    textColor: "#ffffff",
  },
  blocks: [
    {
      id: "blk-1",
      type: "header",
      title: "📌 FEATURED & PROJECTS",
      enabled: true,
      order: 1,
    },
    {
      id: "blk-2",
      type: "link",
      title: "나의 포트폴리오 웹사이트",
      url: "https://alexkim.dev",
      icon: "Globe",
      thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&auto=format&fit=crop&q=80",
      description: "최신 프로젝트 작업물과 케이스 스터디",
      enabled: true,
      order: 2,
    },
    {
      id: "blk-3",
      type: "link",
      title: "최신 영상: Next.js 16 풀스택 마스터하기",
      url: "https://youtube.com/watch?v=mock-video-id",
      icon: "Youtube",
      badge: "HOT 🔥",
      description: "App Router + Zustand 상태관리 실전 가이드",
      enabled: true,
      order: 3,
    },
    {
      id: "blk-4",
      type: "link",
      title: "GitHub 오픈소스 프로젝트 모음",
      url: "https://github.com/alexkim-dev",
      icon: "Github",
      description: "별 1.2k+ 스타를 받은 컴포넌트 라이브러리",
      enabled: true,
      order: 4,
    },
    {
      id: "blk-5",
      type: "divider",
      enabled: true,
      order: 5,
    },
    {
      id: "blk-6",
      type: "header",
      title: "📢 ANNOUNCEMENT & RESOURCES",
      enabled: true,
      order: 6,
    },
    {
      id: "blk-7",
      type: "text",
      content: "💡 11월 한정 1:1 커리어 커피챗 및 코드 리뷰 멘토링 신청을 받고 있습니다. 부담 없이 신청해주세요!",
      enabled: true,
      order: 7,
    },
    {
      id: "blk-8",
      type: "link",
      title: "1:1 커피챗 & 멘토링 예약하기",
      url: "https://calendly.com/alexkim/coffee-chat",
      icon: "Coffee",
      description: "주니어 개발자 취업 및 포트폴리오 피드백",
      enabled: true,
      order: 8,
    },
    {
      id: "blk-9",
      type: "link",
      title: "사이드 프로젝트 스타터 킷 다운로드",
      url: "https://alexkim.gumroad.com/l/starter-kit",
      icon: "Download",
      badge: "FREE",
      description: "Next.js + Tailwind + shadcn/ui 보일러플레이트",
      enabled: true,
      order: 9,
    },
    {
      id: "blk-10",
      type: "link",
      title: "주간 프론트엔드 트렌드 뉴스레터",
      url: "https://alextech.substack.com",
      icon: "Mail",
      description: "매주 월요일 아침 배달되는 테크 인사이트",
      enabled: true,
      order: 10,
    },
  ],
};
```

---

## 7. Phase 1 구현 체크리스트 (시연 준비)

- [x] **0. shadcn/ui 디자인 시스템 셋업 (`components.json`, preset `b7WQbDtnU`)**
  - 테마 토큰, CSS 변수(`globals.css`), 유틸리티(`cn`) 초기화 완료
- [x] **1. Mock 데이터 및 타입 정의 (`types.ts`, `mockData.ts`)**
  - PRD 6.1에 명시된 기본 크리에이터 Mock 데이터(`defaultMockData`) 적용
  - 다채로운 링크, 헤더, 텍스트, 디바이더 블록 및 소셜 아이콘 완비
- [x] **2. Zustand 스토어 및 LocalStorage 영속화 모듈 (`useMyLinkStore.ts`)**
  - `persist` 설정 및 상태 로드/리셋 액션 구현
- [x] **3. 프로필 헤더 컴포넌트 (`ProfileHeader.tsx`)**
  - shadcn/ui `Avatar` 활용, 이름, Bio, 소셜 아이콘 바
- [x] **4. 블록 렌더러 컴포넌트 (`BlockRenderer.tsx`, `LinkCard.tsx` 등)**
  - shadcn/ui `Button`, `Card`, `Separator` 기반 링크 카드, 헤더, 텍스트, 디바이더 렌더링
- [x] **5. 테마 스타일 래퍼 (`ThemeContainer.tsx`)**
  - 배경 그라디언트, 버튼 스타일, 텍스트 색상 동적 적용
- [x] **6. 프로필 메인 페이지 (`page.tsx`)**
  - 모바일 프레임 중앙 정렬 레이아웃 및 시연용 '기본 데이터 초기화' 버튼 탑재
- [x] **7. 다이얼로그 기반 링크 추가 기능 (`AddLinkDialog.tsx`, 로컬 상태 영속화 연동)**
  - 모달 다이얼로그 폼, 실시간 미리보기, 뱃지/아이콘/썸네일 선택 지원, Zustand & LocalStorage 자동 영속화
