# Persona AI - Frontend

친구들이 만드는 나만의 AI 페르소나 웹 애플리케이션의 프론트엔드입니다.

## 기술 스택

- **Framework**: Vue 3 (Composition API with `<script setup>`)
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Styling**: Tailwind CSS v3
- **API Client**: Axios
- **Mock API**: axios-mock-adapter

## 프로젝트 구조

```
src/
├── api/              # API 클라이언트, 타입, Mock 데이터
├── assets/           # 정적 자산
├── components/       # 재사용 가능한 Vue 컴포넌트
│   ├── base/         # 범용 기본 컴포넌트
│   └── domain/       # 도메인 특화 컴포넌트
├── composables/      # Composition API 재사용 함수
├── layouts/          # 페이지 레이아웃 컴포넌트
├── router/           # Vue Router 설정
├── stores/           # Pinia 스토어
├── styles/           # 전역 스타일
├── types/            # TypeScript 타입 정의
├── utils/            # 유틸리티 함수
└── views/            # 페이지 컴포넌트
```

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:5173`에서 실행됩니다.

### 빌드

```bash
npm run build
```

프로덕션용 빌드가 `dist/` 디렉토리에 생성됩니다.

### 빌드 미리보기

```bash
npm run preview
```

### 타입 체크

```bash
npm run type-check
```

## 환경 변수

프로젝트 루트의 `.env` 파일에서 다음 환경 변수를 설정할 수 있습니다:

```env
VITE_API_BASE_URL=/api/v1
VITE_MOCK_API=true
```

- `VITE_API_BASE_URL`: API 서버의 베이스 URL
- `VITE_MOCK_API`: Mock API 활성화 여부 (`true`/`false`)

## Phase 1 개발

현재는 Phase 1 개발 단계로, Mock API를 사용하여 백엔드 없이 프론트엔드를 개발하고 테스트할 수 있습니다.

### Mock API

`VITE_MOCK_API=true`로 설정하면:
- 모든 API 호출이 Mock Adapter에 의해 가로채집니다
- `src/api/mocks/data/` 디렉토리의 JSON 파일에서 Mock 데이터를 제공합니다
- 실제 네트워크 지연을 시뮬레이션합니다

### 실제 API로 전환

Phase 2에서 실제 백엔드 API를 연결하려면:
1. `.env` 파일에서 `VITE_MOCK_API=false`로 설정
2. `VITE_API_BASE_URL`을 실제 백엔드 서버 URL로 변경
3. 코드 변경 없이 자동으로 실제 API를 사용합니다

## 주요 기능

### 페이지

- `/` - 랜딩 페이지 (WelcomePage)
- `/auth` - 로그인 페이지 (AuthPage)
- `/analysis` - 분석 대시보드 (AnalysisHub)
- `/survey/:analysisId` - 설문 작성 페이지 (SurveyPage)
- `/persona/reveal` - 페르소나 생성 애니메이션 (PersonaReveal)
- `/persona/chat` - 페르소나와 채팅 (PersonaChat)

### 컴포넌트

#### Base 컴포넌트
- `BaseButton` - 버튼
- `BaseCard` - 카드 컨테이너
- `BaseInput` - 입력 필드
- `BaseModal` - 모달 다이얼로그
- `BaseSpinner` - 로딩 스피너
- `BaseNotification` - Toast 알림

#### Domain 컴포넌트
- `GoogleLoginButton` - Google 로그인 버튼
- `ShareLinkCard` - 링크 공유 카드
- `ResponseTracker` - 응답 진행 상황 트래커
- `PersonaHeader` - 페르소나 헤더
- `ChatWindow` - 채팅 윈도우
- `ChatMessage` - 채팅 메시지
- `ChatInput` - 채팅 입력
- `QuestionCard` - 설문 질문 카드

### 상태 관리 (Pinia Stores)

- `authStore` - 사용자 인증 및 프로필
- `analysisStore` - 프로필 분석 생성 및 상태
- `personaStore` - 페르소나 생성 및 채팅
- `uiStore` - 전역 UI 상태 (로딩, 알림)

## 개발 가이드

### 컴포넌트 작성

모든 컴포넌트는 `<script setup>` 문법을 사용합니다:

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  title: string
}

const props = defineProps<Props>()
</script>

<template>
  <div>{{ title }}</div>
</template>
```

### 경로 별칭

TypeScript와 Vite 모두 `@/` 별칭을 지원합니다:

```typescript
import { useAuthStore } from '@/stores/auth'
import BaseButton from '@/components/base/BaseButton.vue'
```

### 스타일링

Tailwind CSS 유틸리티 클래스를 사용합니다:

```vue
<template>
  <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
    Click me
  </button>
</template>
```

커스텀 색상과 타이포그래피는 `tailwind.config.js`에 정의되어 있습니다.

## 라이선스

이 프로젝트는 비공개 프로젝트입니다.
