# Re:MirAI API - Chat

사용자가 생성한 Persona(디지털 미러)와 대화하는 기능입니다.

## Architecture

- REST API: 세션 조회/생성, 히스토리 조회, 메시지 전송
- WebSocket Gateway (`/chat` namespace): 실시간 인증/입장/메시지 이벤트
- Auth: REST는 JWT Guard 필수, WebSocket은 `chat:auth` 이벤트 기반

## REST Endpoints

### 1) Get Chat Sessions
- Endpoint: `GET /chats/sessions`
- Status: Implemented
- Auth: JWT required
- Response (200):
```json
[
  {
    "id": "session_uuid",
    "personaId": "persona_uuid",
    "personaName": "My Mirror",
    "startedAt": "2026-03-22T10:30:00.000Z",
    "lastMsgAt": "2026-03-22T10:45:00.000Z"
  }
]
```
- Errors:
  - `401 UNAUTHORIZED`: JWT 없음/만료

### 2) Start Or Reuse Session
- Endpoint: `POST /chats/sessions`
- Status: Implemented
- Auth: JWT required
- Body:
```json
{
  "personaId": "persona_uuid"
}
```
- Response (201/200):
```json
{
  "id": "session_uuid",
  "personaId": "persona_uuid",
  "personaName": "My Mirror",
  "startedAt": "2026-03-22T10:30:00.000Z",
  "lastMsgAt": "2026-03-22T10:45:00.000Z"
}
```
- Errors:
  - `400 BAD_REQUEST`: DTO validation 실패
  - `401 UNAUTHORIZED`: JWT 없음/만료
  - `404 NOT_FOUND`: Persona를 찾을 수 없음

### 3) Get Chat History
- Endpoint: `GET /chats/:sessionId/history`
- Status: Implemented
- Auth: JWT required
- Path:
  - `sessionId`: chat session id
- Query:
  - `limit` (optional, default: `20`)
- Response (200):
```json
{
  "sessionId": "session_uuid",
  "messages": [
    {
      "id": "msg_uuid_1",
      "sender": "USER",
      "content": "How do others see me?",
      "createdAt": "2026-03-22T10:30:00.000Z"
    },
    {
      "id": "msg_uuid_2",
      "sender": "AI",
      "content": "You are often described as calm and consistent.",
      "createdAt": "2026-03-22T10:30:05.000Z"
    }
  ]
}
```
- Errors:
  - `401 UNAUTHORIZED`: JWT 없음/만료
  - `404 NOT_FOUND`: Chat session 없음

### 4) Send Message (REST)
- Endpoint: `POST /chats/:sessionId/messages`
- Status: Implemented
- Auth: JWT required
- Path:
  - `sessionId`: chat session id
- Body:
```json
{
  "content": "How can I improve delegation?"
}
```
- Response (201/200):
```json
{
  "userMessage": {
    "id": "msg_uuid_user",
    "sender": "USER",
    "content": "How can I improve delegation?",
    "createdAt": "2026-03-22T10:31:00.000Z"
  },
  "aiMessage": {
    "id": "msg_uuid_ai",
    "sender": "AI",
    "content": "Start by assigning clear outcomes and check-in cadence.",
    "createdAt": "2026-03-22T10:31:03.000Z"
  }
}
```
- Errors:
  - `400 BAD_REQUEST`: DTO validation 실패
  - `401 UNAUTHORIZED`: JWT 없음/만료
  - `403 FORBIDDEN`: 메시지 moderation 실패
  - `404 NOT_FOUND`: Chat session 없음

## WebSocket Gateway (`/chat`)

Status: Implemented

### Client -> Server
- `chat:auth`
```json
{ "userId": "user_uuid" }
```
- `chat:join`
```json
{ "personaId": "persona_uuid" }
```
- `chat:message`
```json
{ "sessionId": "session_uuid", "content": "hello" }
```

### Server -> Client
- `chat:response`
```json
{
  "id": "msg_uuid_ai",
  "sender": "AI",
  "content": "...",
  "createdAt": "2026-03-22T10:31:03.000Z"
}
```

## Notes

- REST 응답은 `success/data` 래퍼 없이 실제 DTO 형태를 직접 반환합니다.
- WebSocket 인증은 현재 `chat:auth` 이벤트 페이로드의 `userId`를 사용합니다.
- Bond level 증가는 메시지 전송 시 서버에서 `persona.bondLevel`을 증가시키는 방식으로 처리됩니다.

## Security Requirements

- WebSocket 인증은 JWT 기반 서버 검증을 사용합니다.
- `chat:auth` 페이로드의 사용자 식별 정보는 토큰 검증 결과와 불일치하면 거부합니다.
