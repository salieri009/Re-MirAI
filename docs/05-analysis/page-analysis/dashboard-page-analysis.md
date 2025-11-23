# Dashboard Page 심층 분석

## 페이지 개요

**경로**: `/dashboard`  
**컴포넌트**: `DashboardView.vue`  
**역할**: 사용자의 상태(State)를 즉각적으로 반영하는 허브로, "1. 내 페르소나 상태가 지금 어떤지"와 "2. 그래서 다음 행동이 무엇인지"를 1초 안에 답하는 페이지입니다.

## 고유한 목적

### 1. 상태 가시성 (State Visibility)
- **목적**: 사용자의 현재 상태(로딩, 데이터 수집 중, 생성 완료)를 가장 명확하게 인지
- **전략**: 
  - 그룹 A (Primary Status Block): 페르소나 상태를 최상단에 배치
  - 상태별 명확한 시각적 구분 (Ready, Creating, Empty)

### 2. 행동 유도 (Actionability)
- **목적**: 현재 상태에 기반한 가장 중요한 단일 CTA를 명확히 제시
- **전략**: 
  - 그룹 B (Contextual Action Block): 상태별 다른 CTA 제공
  - Primary CTA는 항상 Indigo-Purple 그라데이션

### 3. 최소주의 (Minimalism)
- **목적**: 사용자를 혼란스럽게 하는 부가 정보 제거, 상태와 액션에 집중
- **전략**: 
  - 그룹 C (Supplemental Block): 사용자 정보는 하단에 큰 여백으로 분리
  - 핵심 여정(A, B) 외의 기능은 최소화

## 페르소나 (Persona)

### 타겟 사용자
- **주 타겟**: 로그인 완료한 신규/기존 사용자
- **특성**:
  - "지금 뭐 해야 하지?"라는 질문을 가진 사용자
  - 빠른 의사결정 선호
  - 상태 변화에 민감

### 사용자 정신 모델
- **기대**: 
  - 즉각적인 상태 확인
  - 명확한 다음 행동 제시
  - 진행 상황 시각화
- **우려**: 
  - 무엇을 해야 할지 모름
  - 진행 상황 불명확
  - 복잡한 인터페이스
- **동기**: 페르소나 생성 완료 또는 다음 단계 진행

## 레이아웃 구조

### State-Driven Architecture (XML 프롬프트 준수)

#### 그룹 A: Primary Status Block (최상단)
```
┌─────────────────────────────────────┐
│  [Your AI Persona]                  │
│                                      │
│  State: Ready                        │
│  ┌─────────────────────────────┐    │
│  │ [PersonaCard (compact)]     │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

**상태별 분기**:
- `ready`: PersonaCard 표시
- `creating`: LoadingSkeleton (PersonaCard 형태)
- `empty`: 빈 상태 메시지 + "Start Collecting Feedback" CTA

#### 그룹 B: Contextual Action Block (그룹 A 바로 아래)
```
┌─────────────────────────────────────┐
│  State: Ready                        │
│  [Chat with Your Persona] (Primary) │
│                                      │
│  State: Creating                     │
│  [Feedback Collection Progress]      │
│  [Share Survey Link] (Primary)       │
│  [View Feedback Details] (Secondary) │
│                                      │
│  State: Empty                        │
│  [Start Collecting Feedback] (Primary)│
└─────────────────────────────────────┘
```

**상태별 CTA**:
- `ready`: "Chat with Your Persona" (Primary, indigo-purple gradient)
- `creating`: "Share Survey Link" (Primary) + 진행률 표시
- `empty`: "Start Collecting Feedback" (Primary)

#### 그룹 C: Supplemental Block (하단, 큰 여백)
```
┌─────────────────────────────────────┐
│  [User Avatar] [Name] [Points]      │
│  [Logout Button]                     │
└─────────────────────────────────────┘
```

**여백**: `margin-top: var(--space-10)` (40px)로 핵심 여정과 분리

## 핵심 UI/UX 상호작용

### 1. 상태 기반 UI 분기
- **로직**: `personaStatus` computed property에 따라 전체 레이아웃 변경
- **시각적 피드백**:
  - Ready: Green dot + "Ready" 텍스트
  - Creating: Progress bar + milestone indicators
  - Empty: Plus icon + 설명 텍스트

### 2. 진행률 시각화 (Creating State)
- **Progress Bar**: 
  - 배경: `slate-700`
  - 진행: Indigo-Purple 그라데이션
  - 높이: `h-3` (12px, 4px 배수)
- **Milestones**: 
  - 1st, 2nd, Ready! (3개 지점)
  - 상태별 색상: Indigo/Purple (활성), Slate (비활성)

### 3. Survey Link 공유 (Creating State)
- **Input**: Readonly, 클립보드 복사 가능
- **Button**: Ghost variant, copy icon
- **Feedback**: 성공/실패 메시지 (3초 후 자동 dismiss)

### 4. Primary CTA 버튼
- **스타일**: Indigo-500 to Purple-600 그라데이션
- **위치**: 그룹 B 중앙
- **크기**: `size="lg"`, `w-full`
- **상태**: Loading, Disabled 지원

## 전체 사용자 여정에서의 역할

### 상태 관리 허브 (State Management Hub)
```
[Login Page]
    ↓
[Dashboard] ← 현재 페이지 (상태 확인)
    ↓
[State-based Navigation]
    ├─ Ready → [Persona Room] or [Chat]
    ├─ Creating → [Survey Hub] or [Share Link]
    └─ Empty → [Survey Creation]
```

### 여정 단계별 역할

1. **상태 확인 단계 (Status Check)**
   - 역할: 사용자의 현재 상태를 즉각적으로 표시
   - 성공 지표: 상태 인지 시간 (< 1초)

2. **행동 유도 단계 (Action Guidance)**
   - 역할: 상태에 맞는 다음 행동을 명확히 제시
   - 성공 지표: CTA 클릭률, 올바른 액션 선택률

3. **진행 모니터링 단계 (Progress Monitoring)**
   - 역할: Creating 상태에서 진행률 시각화
   - 성공 지표: 진행률 확인 빈도, 링크 공유 횟수

### 여정 연결점

- **이전 단계**: Login Page (`/login`)
- **다음 단계** (상태별):
  - Ready: Persona Room (`/room/:personaId`) 또는 Chat (`/chat/:personaId`)
  - Creating: Survey Hub (`/ritual`) 또는 링크 공유
  - Empty: Survey Creation (API 호출 후 상태 업데이트)

## 디자인 시스템 준수

### KickoffLabs 원칙
- ✅ **색상 제한**: 2색 (Indigo + Purple)
- ✅ **단일 폰트**: Inter만 사용
- ✅ **4px 그리드**: 모든 spacing이 CSS 변수 사용
- ✅ **일관된 패딩**: `--card-padding` (24px), `--section-spacing` (48px)

### XML 프롬프트 준수
- ✅ **State-Driven Architecture**: 그룹 A, B, C 구조
- ✅ **수직 우선순위**: A → B → C 순서 엄격 준수
- ✅ **CTA 디자인**: Primary CTA는 Indigo-Purple 그라데이션
- ✅ **상태 분리**: Ready 상태에서 Creating UI 절대 노출 안 함

### Re:MirAI 컨셉 반영
- **명확성**: "1초 안에 상태 파악" 목표
- **행동성**: 상태 기반 명확한 CTA
- **최소주의**: 핵심 정보만 표시

## 상태 관리 상세

### PersonaStatus States
1. **`ready`**
   - 조건: `persona.status === 'ready'`
   - UI: PersonaCard + "Chat with Your Persona" CTA
   - 다음 액션: Chat 또는 Room으로 이동

2. **`creating`** (또는 `generating`)
   - 조건: `persona.status === 'creating'` 또는 `'generating'`
   - UI: LoadingSkeleton + 진행률 + 링크 공유
   - 다음 액션: Survey 링크 공유 또는 진행 확인

3. **`empty`**
   - 조건: `!persona` 또는 `persona === null`
   - UI: 빈 상태 메시지 + "Start Collecting Feedback" CTA
   - 다음 액션: Survey 생성

### Survey States
- **`hasActiveSurvey`**: 진행 중인 Survey 존재
- **`canSummon`**: 충분한 응답 수집 완료
- **`responsesProgress`**: 진행률 퍼센트 (0-100)

## 접근성 (Accessibility)

- **ARIA**:
  - 로딩: `role="status" aria-live="polite"`
  - 에러: `role="alert" aria-live="assertive"`
  - 상태: `aria-label`로 상태 설명
- **키보드 네비게이션**: 
  - 모든 버튼이 Tab으로 접근 가능
  - Enter로 액션 실행
- **스크린 리더**: 상태 변화를 명확히 알림

## 성능 최적화

- **로딩 상태**: Skeleton UI로 레이아웃 시프트 방지
- **폴링**: Persona 상태는 주기적으로 확인 (Creating 상태)
- **조건부 렌더링**: 상태별로 필요한 컴포넌트만 렌더링

## A/B 테스트 고려사항

- **CTA 텍스트**: "Chat with Your Persona" vs "Start Conversation"
- **진행률 표시**: Progress bar vs Circular progress
- **상태 인디케이터**: Dot + Text vs Icon + Text
