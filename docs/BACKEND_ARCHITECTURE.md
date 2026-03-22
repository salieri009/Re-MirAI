# Re:MirAI BACKEND ARCHITECTURE

## 1. 스택
- NestJS (모듈형)
- PostgreSQL + Prisma ORM
- Passport OAuth (Google/Kakao/Apple)
- JWT Access/Refresh
- OpenAI 연동
- Chat: REST + WebSocket 병행

## 2. 모듈(현재 코드 기준)
- auth
- survey
- persona
- chat
- openai

## 3. 라우트 개요(현재 구현)
### Auth
- GET /auth/google, /auth/google/callback
- GET /auth/kakao, /auth/kakao/callback
- GET /auth/apple, POST /auth/apple/callback
- POST /auth/refresh
- POST /auth/logout

### Survey
- POST /surveys
- GET /surveys/my
- GET /surveys/:linkOrId/public
- POST /surveys/:id/responses
- GET /surveys/:id/status

### Persona
- POST /personas/synthesize
- GET /personas
- GET /personas/:id

### Chat
- GET /chats/sessions
- POST /chats/sessions
- GET /chats/:sessionId/history
- POST /chats/:sessionId/messages

## 4. 보안/검증
- JwtAuthGuard로 보호 라우트 구분
- ValidationPipe(whitelist/forbidNonWhitelisted/transform)
- CORS origin 환경변수 기반 제한

## 5. 데이터 처리 원칙
- SurveyResponse는 익명 fingerprint 해시 저장
- Persona 생성은 LLM 결과를 정규 필드 + systemPrompt로 저장
- 인덱스는 userId/status/shareableLink 중심

## 6. 운영 포인트
- Prisma migrate/generate 워크플로우 준수
- 모듈 단위로 컨트롤러/서비스/DTO 분리
- 합성/채팅 오류는 사용자 재시도 가능 경로 제공
