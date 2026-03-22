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
