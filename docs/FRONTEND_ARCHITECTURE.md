# Re:MirAI FRONTEND ARCHITECTURE

## 1. 스택
- Next.js 14 App Router
- React 18 + TypeScript
- TanStack Query (서버 상태)
- Zustand (UI/세션 상태)
- GSAP (주요 인터랙션/리빌 애니메이션)

## 2. 앱 라우트(현재 코드 기준)
- / (landing)
- /login
- /auth/callback
- /dashboard
- /dashboard/ritual
- /dashboard/synthesize
- /dashboard/practice
- /s/[id], /s/[id]/thank-you
- /p/[id]
- /chat/[id]
- /summon
- /social/compatibility
- /profile/settings

## 3. 계층 구조
- app/: 페이지/레이아웃
- components/: atoms/molecules/organisms
- lib/api/: API 클라이언트 계층
- stores/: Zustand 스토어
- styles/: 토큰/글로벌 스타일

## 4. 상태 전략
- Query: survey/persona/chat 조회/뮤테이션
- Zustand: auth/session, UI 패널/토글
- 페이지 상태: loading/error/empty/success 명시적 처리

## 5. API 연동 원칙
- Axios 인스턴스 공통화
- 401 발생 시 refresh 재시도 -> 실패 시 로그인 유도
- 타입 정의를 DTO/Prisma 모델과 동기화

## 6. 접근성/디자인
- Small Switch Palette v2 준수
- 대비/가독성 우선, 명확한 상태 텍스트
- 모션은 의미 있는 전환에 한정

## 7. 테스트 권장
- 페이지 단위 스냅샷/상태 테스트
- API 모듈 단위 계약 테스트
- 핵심 여정(E2E): 로그인 -> 설문 생성 -> 응답 -> 합성 -> 채팅

## 8. Dashboard/Ritual UI Architecture (개편안)
산발적으로 나열된 기존 UI를 해결하기 위해 **Bento-Box Grid** 형태의 대시보드 구조를 도입합니다. 컨텍스트의 우선순위에 따라 카드를 논리적으로 묶어 렌더링합니다.

### A. Layout Structure (2-Column Grid)
- **Main Column (좌측/상단)**: 현재 진행 중인 핵심 Ritual(설문) 관리에 집중.
- **Side Column (우측/하단)**: 부가 기능, 새로운 Ritual 생성, Practice 모드 등 서브 기능 배치.

### B. Component Hierarchy
1. **Header Group**
   - 안내 문구 및 전체 현황 요약
2. **Main Content (Grid-Left)**
   - **Resonance Board (Progress & Metrics)**: 응답률, 공유 횟수, 상태(Collecting/Ready)를 하나의 응집된 카드로 통합.
   - **Distribution Hub (Share & Nudge)**: URL 복사 기능, 소셜 공유 옵션, 그리고 리마인더 요청 기능을 하나의 '공유/액션' 그룹으로 묶음.
3. **Secondary Content (Grid-Right)**
   - **Synthesize Action**: 응답 조건 충족 시 빛나는 Primary CTA 영역(우측 최상단으로 배치해 접근성 극대화).
   - **Practice Mode Banner**: 친구 응답을 기다리지 않고 자가 응답을 할 수 있는 서브 배너.
   - **Templates List**: 다음에 진행할 수 있는 신규 Ritual 템플릿 목록 (컴팩트하게 축소).

이러한 구조는 화면 스크롤 피로도를 줄이고, 핵심 지표와 액션이 즉각적으로 눈에 들어오게 합니다.

## 9. Dashboard/Synthesize UI Architecture (개편안)
단순한 버튼 나열 형태에서 벗어나, Re:MirAI의 핵심 컨셉인 '마법적 소환(Sacred/Magical)'을 시각적으로 극대화하는 **Cinematic Summoning Interface** 구조를 도입합니다.
### A. Aesthetic Direction (Sacred & Glassmorphism)
- **배경 & 분위기**: 깊은 안개(Mist)와 마법적 에너지(Fuchsia 빛)가 섞인 몽환적 배경. Mesh Gradient와 은은한 Noise Texture 활용.
- **카드 컴포넌트**: 투명한 Glassmorphism 디자인으로, 공중에 떠 있는 듯한 신비로운 느낌과 입체감을 부여.
- **모션 (Motion)**: 선택된 모드에 따라 에너지가 모이는 듯한 Pulse 애니메이션과 부드러운 Glow 이펙트 강화.
### B. Component Hierarchy
1. **Title & Vibe Group**
   - 사용자에게 '소환의 의식'이 시작됨을 알리는 임팩트 있는 타이포그래피 (Display Font 느낌).
2. **Mode Selection (Interactive Cards)**
   - 두 가지 소환 방식(Auto/Alchemic)을 비대칭적이거나 고급스러운 레이아웃의 선택형 카드로 구성.
   - Hover 효과 시 빛(Fuchsia)이 번지는 반응형 애니메이션.
3. **CTA (Summon Button)**
   - 화면 하단 중앙 (또는 카드 우측), 시선을 잡아끄는 강력한 발광 효과(Glow/Pulse)를 가진 마법진 룩 액션 버튼.

