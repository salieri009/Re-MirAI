# Summoning Page 심층 분석

## 페이지 개요

**Route**: `/summon`  
**Component**: `SummoningView.vue`  
**User Journey 위치**: Persona Creation Process (페르소나 생성 프로세스)

---

## 1. 고유한 목적 (Unique Purpose)

### 핵심 목적
Summoning Page는 수집된 피드백을 **AI 페르소나로 변환**하는 마법적 순간을 제공합니다. 목적:

1. **모드 선택**: Fated (자동) vs Alchemic (커스텀) 모드 선택
2. **생성 프로세스**: AI 페르소나 생성 진행 상황 표시
3. **완료 축하**: 생성 완료 시 페르소나 카드와 다음 액션 제시
4. **기대감 조성**: "마법적" 경험으로 사용자 몰입도 향상

### 프로젝트 컨셉과의 연결
- **AI 페르소나 생성**: 타인 피드백을 AI 모델로 변환하는 핵심 단계
- **개인화**: Alchemic 모드로 사용자 선호도 반영
- **결과물 시각화**: 생성된 페르소나를 즉시 확인

---

## 2. 페르소나 (Persona)

### 타겟 사용자
**Primary**: 충분한 피드백을 수집한 사용자, 페르소나 생성 준비 완료

### 사용자 정신 모델
- **기대**: "내 페르소나는 어떤 모습일까?", "빠르게 생성되길 바란다", "결과가 궁금하다"
- **우려**: 생성 실패, 시간 소모, 기대치와 다른 결과
- **동기**: 페르소나 완성, 채팅 시작, 친구들과 공유

### 페이지 페르소나
**"마법사"** - 데이터를 페르소나로 변환하는 마법적 과정을 안내하고, 사용자의 기대감을 높임

---

## 3. 레이아웃 구조 (Layout Architecture)

### 전체 구조: 상태 기반 중앙 집중형

```
┌─────────────────────────────────────┐
│                                     │
│    [Centered Content]               │
│                                     │
│    [State-Based Display]            │
│    • Selection State                 │
│    • Creating State                  │
│    • Complete State                  │
│                                     │
└─────────────────────────────────────┘
```

### Selection State 구조

**Card** (`max-w-2xl mx-auto`):
1. **Title**: "Choose Your Creation Mode" (text-2xl)
2. **Mode Selection** (`grid md:grid-cols-2 gap-6`):
   - **Fated Mode Card**:
     - Title: "Auto Mode"
     - Description: 시스템이 가장 호환되는 아키타입 제안
     - Interaction: `hover:scale-105`
   - **Custom Mode Card**:
     - Title: "Custom Mode"
     - Description: 아키타입 필터 선택 가능
     - Interaction: `hover:scale-105`
3. **Archetype Selector** (conditional: Custom mode):
   - Label: "Select Archetype Filter"
   - Dropdown: Tsundere, Yandere, Kuudere, Genki
4. **Action Button**:
   - "Begin Creation" (indigo-purple gradient, lg size)
   - States: disabled (Custom without archetype), loading

### Creating State 구조

**Centered Content** (`space-y-8`):
1. **Icon**: Sparkle SVG (animate-bounce, text-6xl)
2. **Title**: "Creating Your Persona" (text-4xl, text-gradient)
3. **LoadingSpinner**: "Processing feedback data..." (lg size)
4. **Description**: "Your Persona is being generated from collected feedback..."

### Complete State 구조

**Centered Content** (`space-y-8 animate-fade-in`):
1. **Title**: "Persona Created!" (text-4xl, text-gradient)
2. **PersonaCard**: 생성된 페르소나 표시
3. **Actions** (`flex gap-4 justify-center`):
   - Primary: "Go to Persona Room" (lg size)
   - Secondary: "Start Chatting" (lg size)

---

## 4. 핵심 UI/UX 상호작용 (Key Interactions)

### Primary Interactions

1. **Mode Selection**:
   - Fated/Custom 카드 클릭 → 선택 상태 업데이트
   - Custom 선택 시 Archetype Selector 표시
   - 선택 상태에 따라 버튼 활성화/비활성화

2. **Begin Creation**:
   - 버튼 클릭 → API 호출
   - Creating State로 전환
   - 백엔드에서 페르소나 생성 프로세스 시작

3. **Creation Progress**:
   - Polling 또는 WebSocket으로 진행 상황 업데이트
   - Complete State로 자동 전환

4. **Post-Creation Actions**:
   - "Go to Persona Room": `/room/:personaId`로 이동
   - "Start Chatting": `/chat/:personaId`로 이동

### Micro-Interactions

- **Mode Cards**: Hover 시 scale-105, 시각적 피드백
- **Loading Animation**: Sparkle icon bounce, 기대감 조성
- **Fade-in**: Complete State 등장 애니메이션

### Accessibility Interactions

- **Button Labels**: 명확한 aria-label
- **Loading States**: aria-busy, 진행 상황 설명
- **Keyboard Navigation**: 모든 선택 요소 키보드 접근 가능

---

## 5. User Journey에서의 역할

### Journey Position: **Persona Creation Process**

```
[Ritual Hub] (canSummon)
      ↓
[Summoning Page] ← 현재 위치
      ↓
    ├─→ [Persona Room] (Complete)
    └─→ [Chat] (Complete)
```

### Journey Flow에서의 역할

1. **Entry** (Ritual Hub에서 유입):
   - "Begin Summoning" 클릭
   - Selection State 표시

2. **Mode Selection** (사용자 선택):
   - Fated: 빠른 자동 생성
   - Custom: 아키타입 선택 후 생성

3. **Creation Process** (백엔드 처리):
   - Creating State 표시
   - 진행 상황 모니터링 (선택적)
   - 완료 대기

4. **Completion** (페르소나 생성 완료):
   - Complete State 표시
   - PersonaCard로 결과 확인
   - 다음 액션 선택 (Room 또는 Chat)

### Success Metrics

- **Creation Success Rate**: 페르소나 생성 성공률 (목표: >95%)
- **Time to Complete**: 생성 완료까지 시간 (목표: <2분)
- **Mode Selection**: Fated vs Custom 선택 비율
- **Post-Creation Action**: Room vs Chat 선택 비율

### 다음 단계 연결

- **Success Path**: Summoning → Persona Room → Chat
- **Error Path**: Summoning → (Error) → (Retry) → Summoning
- **Alternative Path**: Summoning → Dashboard (상태 확인)

---

## 6. 디자인 시스템 준수

### KickoffLabs 원칙 준수

✅ **Color Limitation**: 2색 (Indigo + Purple)  
✅ **Single Font**: Inter only  
✅ **4px Grid**: 모든 spacing이 4px 배수  
✅ **Single Primary Action**: "Begin Creation" 버튼만 강조

### 프로젝트 컨셉 반영

✅ **AI 페르소나 생성**: 피드백을 AI 모델로 변환하는 과정 시각화  
✅ **개인화**: Custom 모드로 사용자 선호도 반영  
✅ **결과물 시각화**: PersonaCard로 생성 결과 즉시 확인

---

## 7. 개선 기회

### 현재 강점
- 명확한 모드 선택
- 시각적 피드백
- 완료 후 명확한 다음 단계

### 개선 가능 영역
1. **Progress Visualization**: 생성 진행률을 더 상세히 표시
2. **Preview**: 생성 전 아키타입 미리보기
3. **Error Handling**: 생성 실패 시 재시도 옵션
4. **Time Estimate**: 예상 소요 시간 표시

---

## 참고 자료

- **XML Structure**: `docs/architecture/page-structures/summoning-page.xml`
- **Design System**: `docs/architecture/kickofflabs-compliance.md`
- **Project Concept**: `docs/concept/project_plan.md`
- **Implementation**: `frontend/src/views/summon/SummoningView.vue`

