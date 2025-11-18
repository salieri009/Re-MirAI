# Landing Page 심층 분석

## 페이지 개요

**경로**: `/`  
**컴포넌트**: `LandingView.vue`  
**역할**: Re:MirAI의 메인 진입점으로, 프로젝트의 핵심 가치 제안을 제시하고 사용자를 온보딩 여정으로 안내합니다.

## 고유한 목적

### 1. 첫인상 형성 (First Impression)
- **목적**: 방문자에게 Re:MirAI의 핵심 컨셉("타인은 나를 어떻게 보는가?")을 즉각적으로 전달
- **전략**: "Discover Your True Self" 헤드라인과 "AI Persona created from how your friends actually see you" 서브헤드라인으로 즉각적인 가치 제안

### 2. 신뢰 구축 (Trust Building)
- **목적**: 익명 피드백, 프라이버시 보호, AI 기반 분석의 신뢰성 확립
- **전략**: Trust indicators (Free to start, Privacy protected)와 3단계 프로세스 시각화

### 3. 전환 유도 (Conversion)
- **목적**: 방문자를 등록/로그인으로 유도
- **전략**: 명확한 Primary CTA ("Start Discovery", "Begin Your Discovery")와 urgency 요소 (Free during early access)

## 페르소나 (Persona)

### 타겟 사용자
- **주 타겟**: 10-20대 소셜 미디어 활성 사용자
- **특성**: 
  - MBTI, 별자리, 성격 테스트에 관심
  - 자기 발견(self-discovery)에 열정적
  - 친구들과의 관계에 대한 호기심
  - 바이럴 콘텐츠 공유 선호

### 사용자 정신 모델
- **기대**: 빠르고 쉬운 자기 발견 경험
- **우려**: 프라이버시, 복잡성, 시간 투자
- **동기**: "진짜 나는 누구인가?"에 대한 답을 찾고 싶음

## 레이아웃 구조

### Hero Section (Section 1)
```
┌─────────────────────────────────────────┐
│  [Logo: Re:MirAI]                        │
│                                          │
│  "Discover Your True Self"              │
│  (text-4xl → text-7xl)                   │
│                                          │
│  "AI Persona created from how your      │
│   friends actually see you"              │
│                                          │
│  [Start Discovery] [See How]             │
│                                          │
│  Free to start • Privacy protected      │
└─────────────────────────────────────────┘
```

**디자인 원칙 준수**:
- 4px 그리드: `--subsection-spacing` (32px), `--element-spacing` (16px)
- 색상 제한: Indigo-Purple 그라데이션만 사용
- 단일 폰트: Inter (bold, semibold, regular)

### How It Works Section (Section 2)
```
┌─────────────────────────────────────────┐
│  [Badge: The Mirror of Relationships]   │
│                                          │
│  "Stop Guessing. Start Knowing."        │
│                                          │
│  [Step 1: Mirror Setup]                 │
│  [Step 2: Truth Unveiled]                │
│  [Step 3: AI Twin]                       │
│                                          │
│  [Problem vs Solution Comparison]        │
└─────────────────────────────────────────┘
```

**3단계 프로세스 시각화**:
- 각 단계는 독립적인 카드로 표현
- 아이콘 + 제목 + 설명 구조
- 애니메이션 효과 (hover, ping)로 시각적 흥미 유발

### CTA Section (Section 3)
```
┌─────────────────────────────────────────┐
│  [Urgency Badge: Free during early      │
│   access • Limited time]                 │
│                                          │
│  "Ready to see yourself through          │
│   their eyes?"                           │
│                                          │
│  [Begin Your Discovery] [See Live Demo]  │
│                                          │
│  Trust signals (Free, Privacy, No spam)  │
└─────────────────────────────────────────┘
```

## 핵심 UI/UX 상호작용

### 1. Primary CTA 버튼
- **위치**: Hero 섹션 중앙, CTA 섹션 중앙
- **스타일**: Indigo-500 to Purple-600 그라데이션
- **상호작용**: 
  - Hover: 그라데이션 강화 (from-indigo-600 to-purple-700)
  - Click: `/login` 또는 `/dashboard`로 라우팅
  - Focus: `focus:ring-4 focus:ring-primary/30`

### 2. Trust Indicators
- **위치**: Hero 섹션 하단, CTA 섹션 하단
- **형태**: 아이콘 + 텍스트 (SVG 아이콘 사용, 이모지 제거)
- **목적**: 즉각적인 신뢰 신호 제공

### 3. Process Flow 시각화
- **인터랙션**: 
  - 카드 hover 시 scale-105 효과
  - Step 번호에 ping 애니메이션
  - SVG 연결선 (데스크톱만)

### 4. Responsive Adaptation
- **모바일**: 단일 컬럼, 텍스트 크기 축소
- **태블릿**: 2컬럼 그리드 시작
- **데스크톱**: 전체 레이아웃, SVG 연결선 표시

## 전체 사용자 여정에서의 역할

### 진입점 (Entry Point)
```
[외부 링크/검색]
    ↓
[Landing Page] ← 현재 페이지
    ↓
[Login/Register]
    ↓
[Dashboard]
```

### 여정 단계별 역할

1. **인지 단계 (Awareness)**
   - 역할: 프로젝트의 존재와 가치 제안 전달
   - 성공 지표: 페이지 체류 시간, 스크롤 깊이

2. **관심 단계 (Interest)**
   - 역할: "How It Works" 섹션으로 프로세스 이해도 향상
   - 성공 지표: "See How" 버튼 클릭률

3. **의사결정 단계 (Decision)**
   - 역할: Trust signals와 CTA로 전환 유도
   - 성공 지표: CTA 클릭률, 회원가입 전환율

### 여정 연결점

- **다음 단계**: Login Page (`/login`)
- **대안 경로**: "See Live Demo" → Public Profile 예시
- **재방문 경로**: 로그인된 사용자는 Dashboard로 리다이렉트

## 디자인 시스템 준수

### KickoffLabs 원칙
- ✅ **색상 제한**: 2색 (Indigo + Purple)
- ✅ **단일 폰트**: Inter만 사용
- ✅ **4px 그리드**: 모든 spacing이 4px 배수
- ✅ **일관된 패딩**: CSS 변수 사용

### Re:MirAI 컨셉 반영
- **핵심 질문**: "Who am I — and who do others believe I am?"
- **시각적 메타포**: Mirror (반영), Stream (흐름)
- **감성적 톤**: 신비롭지만 접근 가능한 (Mystical but Accessible)

## 성능 최적화

- **이미지**: PersonaCard mockup은 최적화된 이미지 또는 SVG
- **애니메이션**: CSS transitions 사용 (GSAP는 Summoning Scene에서만)
- **로딩**: Skeleton UI 대신 즉각적인 콘텐츠 표시

## 접근성 (Accessibility)

- **ARIA**: 모든 인터랙티브 요소에 `aria-label`
- **시맨틱 HTML**: `<section>`, `<header>`, `<nav>`, `<main>` 사용
- **키보드 네비게이션**: 모든 버튼이 키보드로 접근 가능
- **스크린 리더**: `sr-only` 클래스로 설명 텍스트 제공

## A/B 테스트 고려사항

- **CTA 텍스트**: "Start Discovery" vs "Begin Your Journey"
- **Hero 이미지**: PersonaCard mockup vs 애니메이션 일러스트
- **Trust indicators 위치**: Hero 하단 vs CTA 섹션
