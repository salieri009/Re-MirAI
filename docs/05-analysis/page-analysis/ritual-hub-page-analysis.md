# Ritual Hub Page 심층 분석

## 페이지 개요

**Route**: `/ritual`  
**Component**: `RitualHubView.vue`  
**User Journey 위치**: Survey Management Hub (설문 관리 허브)

---

## 1. 고유한 목적 (Unique Purpose)

### 핵심 목적
Ritual Hub는 사용자가 **Survey(설문)를 생성하고 관리**하는 전용 공간입니다. 목적:

1. **Survey 생성**: 새로운 피드백 수집 설문 생성
2. **진행 상황 모니터링**: 수집된 응답 수와 진행률 추적
3. **링크 공유**: Survey 링크를 쉽게 복사하고 공유
4. **소환 준비**: 충분한 응답 수집 시 페르소나 생성 시작

### 프로젝트 컨셉과의 연결
- **타인 피드백 수집**: Survey 생성 및 공유의 중심
- **진행 상황 투명성**: 응답 수와 진행률을 명확히 표시
- **빠른 액션**: 링크 복사, 공유, 소환 시작을 한 곳에서 처리

---

## 2. 페르소나 (Persona)

### 타겟 사용자
**Primary**: Survey를 생성한 사용자, 피드백 수집 진행 중

### 사용자 정신 모델
- **기대**: "몇 명이 응답했나?", "언제 페르소나를 만들 수 있나?", "링크를 쉽게 공유하고 싶다"
- **우려**: 진행이 느림, 링크 공유의 불편함, 다음 단계 불명확
- **동기**: 충분한 응답 수집, 페르소나 생성 시작

### 페이지 페르소나
**"설문 관리자"** - Survey의 전체 생명주기를 관리하고, 사용자가 다음 단계를 명확히 알 수 있도록 안내

---

## 3. 레이아웃 구조 (Layout Architecture)

### 전체 구조: 상태 기반 단일 컬럼

```
┌─────────────────────────────────────┐
│  HEADER                              │
│  - "The Ritual" (text-gradient)      │
│  - Description                        │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│  CONTENT (State-Based)               │
│                                      │
│  [Empty State]                       │
│  - Empty vessel message              │
│  - "Prepare the Vessel" CTA          │
│                                      │
│  OR                                  │
│                                      │
│  [Active State]                      │
│  - Ritual Progress Card              │
│    • Crystals Gathered               │
│    • Progress Bar                     │
│    • Invitation Link                 │
│    • Begin Summoning Button          │
│  - Practice Summon Card              │
└─────────────────────────────────────┘
```

### Empty State 구조

**Card** (`text-center space-y-6`):
- Message: "Your vessel is empty. Let's begin the summoning ritual."
- Primary CTA: "Prepare the Vessel" (indigo-purple gradient, lg size)
- → Survey 생성 액션

### Active State 구조

**Ritual Progress Card**:
1. **Header**: "Ritual in Progress" (text-2xl)
2. **Progress Section** (`space-y-4`):
   - Label: "Crystals Gathered"
   - Count: `{responsesCount} / {minimumResponses}`
   - Progress Bar: gradient fill, dynamic width
3. **Invitation Section** (`mt-6`):
   - Label: "Invitation Link"
   - Input: readonly, survey URL
   - ShareButton: 복사/공유 기능
4. **Action Section** (`mt-6`):
   - "Begin Summoning" Button (conditional: canSummon)
   - Disabled state: "X more needed" 메시지

**Practice Summon Card**:
- Title: "Impatient? Perform a Practice Summon"
- Description: Self-reflection survey 설명
- Secondary CTA: "Start Practice Summon"

---

## 4. 핵심 UI/UX 상호작용 (Key Interactions)

### Primary Interactions

1. **Survey 생성** ("Prepare the Vessel"):
   - 버튼 클릭 → API 호출
   - 성공: Active State로 전환
   - 실패: 에러 메시지 표시

2. **Survey Link 공유**:
   - ShareButton 클릭 → Clipboard 복사
   - 또는 소셜 미디어 공유 옵션
   - 성공 피드백 표시

3. **Begin Summoning**:
   - `canSummon === true`일 때만 활성화
   - 클릭 → `/summon`으로 이동
   - 페르소나 생성 프로세스 시작

### Micro-Interactions

- **Progress Bar**: 실시간 업데이트 애니메이션
- **Button States**: Loading, Disabled 상태 처리
- **Link Copy**: Clipboard API 사용, 피드백 표시

### Accessibility Interactions

- **Button Labels**: 명확한 aria-label
- **Loading States**: aria-busy 속성
- **Progress Announcement**: screen reader를 위한 진행률 알림

---

## 5. User Journey에서의 역할

### Journey Position: **Survey Management Hub**

```
[Dashboard] (Creating State)
      ↓
[Ritual Hub] ← 현재 위치
      ↓
    ├─→ [Survey Link Share] (External)
    ├─→ [Summoning] (canSummon)
    └─→ [Practice Summon] (Optional)
```

### Journey Flow에서의 역할

1. **Survey 생성** (Empty State):
   - Dashboard에서 "Create Survey Link" 클릭
   - 또는 직접 `/ritual` 접근
   - Survey 생성 → Active State로 전환

2. **피드백 수집** (Active State):
   - Survey Link 공유
   - 진행률 모니터링
   - 응답 수 대기

3. **페르소나 생성 준비** (canSummon):
   - 충분한 응답 수집
   - "Begin Summoning" 버튼 활성화
   - → Summoning Page로 이동

4. **Practice Summon** (선택적):
   - 빠른 결과를 원하는 사용자
   - Self-reflection survey
   - 낮은 등급의 Proto-Persona 생성

### Success Metrics

- **Survey Creation Rate**: Survey 생성 성공률 (목표: >95%)
- **Link Share Rate**: 링크 공유 빈도 (목표: 평균 3회 이상)
- **Response Collection**: 평균 응답 수집 시간 (목표: <48시간)
- **Summoning Initiation**: "Begin Summoning" 클릭률 (목표: >80%)

### 다음 단계 연결

- **Success Path**: Ritual Hub → (Share Link) → (Collect Responses) → Summoning
- **Practice Path**: Ritual Hub → Practice Summon → (Quick Persona)
- **Return Path**: Ritual Hub → Dashboard (상태 확인)

---

## 6. 디자인 시스템 준수

### KickoffLabs 원칙 준수

✅ **Color Limitation**: 2색 (Indigo + Purple)  
✅ **Single Font**: Inter only  
✅ **4px Grid**: 모든 spacing이 4px 배수  
✅ **Single Primary Action**: "Prepare the Vessel" 또는 "Begin Summoning"

### 프로젝트 컨셉 반영

✅ **타인 피드백 수집**: Survey 생성 및 링크 공유 중심  
✅ **진행 상황 투명성**: Progress Bar와 카운터로 명확히 표시  
✅ **빠른 액션**: 링크 복사, 공유, 소환 시작을 한 곳에서 처리

---

## 7. 개선 기회

### 현재 강점
- 명확한 진행 상황 표시
- 쉬운 링크 공유
- 상태 기반 UI

### 개선 가능 영역
1. **Real-time Updates**: WebSocket으로 응답 수 실시간 업데이트
2. **Share Options**: 다양한 공유 채널 (카카오톡, 인스타그램 등)
3. **Reminder System**: 응답 수집이 느릴 때 리마인더
4. **Analytics**: Survey 링크 클릭률, 응답률 통계

---

## 참고 자료

- **XML Structure**: `docs/architecture/page-structures/ritual-hub-page.xml`
- **Design System**: `docs/architecture/kickofflabs-compliance.md`
- **Project Concept**: `docs/concept/project_plan.md`
- **Implementation**: `frontend/src/views/ritual/RitualHubView.vue`

