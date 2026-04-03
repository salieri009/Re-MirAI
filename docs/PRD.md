# Re:MirAI PRD

## 1. 제품 개요
- 제품명: Re:MirAI (Digital Mirror)
- 한 줄 정의: 친구들의 익명 피드백을 AI가 합성해 "외부 시선 기반 페르소나"를 만들고 대화하게 해주는 플랫폼
- 핵심 질문: "사람들은 나를 어떻게 보고 있을까?"

## 2. 문제와 기회
- 자기인식은 보통 자기보고식 테스트에 치우쳐 외부 시선이 반영되기 어렵다.
- 친구 피드백은 가치가 높지만 수집/정리가 번거롭고 익명성 이슈가 있다.
- 생성형 AI를 통해 피드백을 대화 가능한 페르소나로 변환하면 높은 몰입과 공유 동기를 만든다.

## 3. 목표
- 사용자 목표: 외부 시선 기반 자기이해와 대화형 탐색 경험
- 제품 목표: 공유 가능한 결과물(페르소나 카드)로 바이럴 루프 구축
- 품질 목표: 빠른 온보딩, 명확한 상태 피드백, 접근성 높은 UI

## 4. 타깃 사용자
- 자기탐색형 사용자(20~30대)
- 소셜 공유형 사용자(10~20대)
- 창작/콘텐츠 제작 사용자

## 5. 핵심 기능 범위
### F-001 Survey System (Ritual)
- 설문 생성, 공유 링크 발급, 익명 응답 수집
- 최소 응답 수(minResponses) 도달 시 합성 가능 상태

### F-002 Persona Synthesis
- 설문 응답을 LLM으로 요약/합성
- archetype, rarity, 4대 스탯(Charisma/Intellect/Kindness/Energy) 생성

### F-003 Chat Interface
- 페르소나와 대화 세션 생성/유지
- WebSocket 중심 실시간 대화 + REST 백업 경로

### F-004 Persona Card
- 페르소나 핵심 속성을 카드 형태로 보여주고 공유 가능하게 구성

### F-005 Social Features
- 공개 프로필/호환성/Room 방문 등 관계형 경험

### F-006 Gamification
- bond level 기반의 리텐션 설계

## 6. 비기능 요구사항
- 인증: OAuth(구글/카카오/애플) + JWT
- 데이터: PostgreSQL + Prisma, 주요 조회 인덱스 확보
- 성능: 주요 API p95 < 500ms(합성 제외)
- 보안: 익명 응답 fingerprint 해시 저장, 최소 수집 원칙
- 접근성: 가독성/명도 대비, 상태 피드백 명확화

## 7. 성공 지표
- 설문 생성률, 최소 응답 달성률, 합성 완료율
- 채팅 시작률/재방문율, 카드 공유율
- OAuth 완료율, 오류율(5xx/4xx 비중)

## 8. 구현 대상(필수)
- Auth: Google/Kakao/Apple OAuth + JWT(Access/Refresh)
- Survey: 생성/공개 조회/익명 제출/상태 조회
- Persona: 합성/목록/상세
- Chat: 세션 조회/생성, 히스토리, 메시지 전송, WebSocket 이벤트
- Persona Card: 카드 생성 API와 공유 URL 반환
- Social: 호환성 조회, Room 방문
- Gamification: 퀘스트 조회, 보상 수령, 재화 잔액

## 9. API 계약 맵

### Auth
- `GET /auth/google`
- `GET /auth/google/callback`
- `GET /auth/kakao`
- `GET /auth/kakao/callback`
- `GET /auth/apple`
- `POST /auth/apple/callback`
- `POST /auth/refresh`
- `POST /auth/logout`

### Survey
- `POST /surveys`
- `GET /surveys/my`
- `GET /surveys/:linkOrId/public`
- `POST /surveys/:id/responses`
- `GET /surveys/:id/status`

### Persona
- `POST /personas/synthesize`
- `GET /personas`
- `GET /personas/:id`
- `POST /personas/:id/card`

### Chat
- `GET /chats/sessions`
- `POST /chats/sessions`
- `GET /chats/:sessionId/history`
- `POST /chats/:sessionId/messages`
- WebSocket namespace: `/chat`
	- `chat:auth`
	- `chat:join`
	- `chat:message`
	- server event: `chat:response`

### Social
- `GET /social/compatibility?targetPersonaId={id}`
- `GET /social/rooms/:userId`

### Gamification
- `GET /quests`
- `POST /quests/:questId/claim`
- `GET /currency/balance`

## 10. 상세 구현 규칙

### 공통
- 모든 보호 라우트는 `Authorization: Bearer <accessToken>` 필요
- 401 발생 시 프론트는 `POST /auth/refresh` 1회 재시도 후 로그인 페이지 이동
- 에러 응답은 NestJS 표준(`statusCode`, `message`, `error`)을 따른다

### Survey 규칙
- 상태 전이: `COLLECTING -> READY -> COMPLETED -> ARCHIVED`
- `READY` 조건: `responsesCount >= minResponses`
- 익명 응답 중복은 `fingerprintHash` 기준으로 차단
- 공개 설문 조회는 `COLLECTING` 상태만 허용

### Persona 규칙
- 합성 요청은 owner만 가능
- 합성 성공 시 Survey 상태를 `COMPLETED`로 변경
- `mode`는 `FATED | ALCHEMIC` 허용
- 결과에는 `name`, `archetype`, `rarity`, `stats`, `greeting`, `systemPrompt` 포함

### Chat 규칙
- 메시지 전송 시 moderation 검사 수행
- 메시지 왕복 1회마다 해당 Persona의 `bondLevel` 증가
- REST는 항상 백업 경로로 사용 가능해야 함

### Persona Card 규칙
- 카드 생성 응답은 `imageUrl`, `publicProfileUrl`, `expiresAt` 포함
- 카드 접근 URL은 공유 가능한 공개 URL이어야 함

### Social 규칙
- 호환성은 `score(0-100)`, `label`, `description` 반환
- Room 방문 응답은 최소 1개 Persona 목록을 포함
- `label` 허용값: `HARMONIC`, `BALANCED`, `CHALLENGING`, `MIRROR`

### Gamification 규칙
- 퀘스트 상태는 `ACTIVE | COMPLETED | CLAIMED`
- `claim`은 완료된 퀘스트만 가능
- 보상 수령 시 지갑 잔액이 즉시 반영되어야 함
- Daily quest 리셋: 매일 KST 00:00
- Weekly quest 리셋: 매주 월요일 KST 00:00

## 11. 완료 기준 (Definition of Done)
- API 명세와 실제 DTO/Controller 경로가 1:1 일치
- 프론트 `src/lib/api/*.ts` 타입과 응답 필드가 명세와 일치
- 핵심 사용자 여정 E2E 통과
	- OAuth 로그인
	- Ritual 생성/공유/익명 제출
	- Persona 합성
	- Chat 송수신
	- Persona Card 생성/공유
	- Compatibility 조회
	- Quest 조회/보상 수령
