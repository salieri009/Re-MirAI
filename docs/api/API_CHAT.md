# Re:MirAI API - Chat (Conversation with Persona)

사용자가 생성한 Persona(디지털 미러)와 실시간 대화.

## Chat Architecture

- **REST API**: 채팅 히스토리 조회, 세션 관리
- **WebSocket**: 실시간 메시지 송수신 (향후 구현)
- **State**: 세션별로 메시지 히스토리 저장

## Endpoints

### Get Chat Sessions
- **Endpoint**: `GET /chats/sessions`
- **Status**: ✅ **Implemented**
- **Auth**: JWT 필수
- **Query Parameters**: 없음
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "session_123",
        "personaId": "persona_abc",
        "personaName": "My Digital Mirror",
        "createdAt": "2026-03-22T10:30:00Z",
        "lastMessageAt": "2026-03-22T11:45:00Z",
        "messageCount": 15
      }
    ]
  }
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료

### Start Chat Session
- **Endpoint**: `POST /chats/sessions`
- **Status**: ✅ **Implemented**
- **Auth**: JWT 필수
- **Body**:
  ```json
  {
    "personaId": "persona_abc"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "session_123",
      "personaId": "persona_abc",
      "personaName": "My Digital Mirror",
      "createdAt": "2026-03-22T10:30:00Z",
      "status": "active"
    }
  }
  ```
- **Errors**:
  - `400 VALIDATION_ERROR`: Invalid persona ID
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `404 NOT_FOUND`: Persona 없음
  - `409 CONFLICT`: Session 이미 존재 (기존 세션 반환)

### Get Chat History
- **Endpoint**: `GET /chats/:sessionId/history`
- **Status**: ✅ **Implemented**
- **Auth**: JWT 필수
- **Path Parameters**:
  - `sessionId`: Chat Session ID
- **Query Parameters**:
  - `limit` (optional, default 20): 로드할 메시지 수
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "sessionId": "session_123",
      "persona": {
        "id": "persona_abc",
        "name": "My Digital Mirror"
      },
      "messages": [
        {
          "id": "msg_1",
          "role": "user",
          "content": "Tell me about my strengths",
          "createdAt": "2026-03-22T10:30:00Z"
        },
        {
          "id": "msg_2",
          "role": "assistant",
          "content": "Based on the feedback, your key strengths are...",
          "createdAt": "2026-03-22T10:30:10Z"
        }
      ]
    }
  }
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `403 FORBIDDEN`: Session Owner가 아님
  - `404 NOT_FOUND`: Session 없음

### Send Chat Message (REST)
- **Endpoint**: `POST /chats/:sessionId/messages`
- **Status**: ✅ **Implemented**
- **Auth**: JWT 필수
- **Path Parameters**:
  - `sessionId`: Chat Session ID
- **Body**:
  ```json
  {
    "content": "How can I improve my delegation skills?"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "msg_3",
      "role": "assistant",
      "content": "Delegation is about trusting your team. Consider...",
      "createdAt": "2026-03-22T10:31:00Z"
    }
  }
  ```
- **Errors**:
  - `400 VALIDATION_ERROR`: Message too long or empty
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `403 FORBIDDEN`: Session Owner가 아님
  - `404 NOT_FOUND`: Session 없음
  - `500 INTERNAL_ERROR`: OpenAI API 호출 실패

## Message Structure

### Message Object
```json
{
  "id": "msg_1",
  "sessionId": "session_123",
  "role": "user|assistant",
  "content": "The message text",
  "createdAt": "2026-03-22T10:30:00Z"
}
```

### Role Types
- `user`: 사용자 메시지
- `assistant`: Persona (AI) 메시지

## Real-Time Features (WebSocket - Planned)

### Connect to Session WebSocket
```
ws://localhost:3000/chats/:sessionId/ws
```

### WebSocket Events
- `message:send`: 새 메시지 전송
- `message:receive`: 새 메시지 수신
- `typing:start`: 타이핑 시작
- `typing:stop`: 타이핑 종료

## Chat Session States
- `active`: 진행 중
- `paused`: 일시정지
- `archived`: 보관됨

## 보안 & 제한
- 모든 채팅은 User 소유 Persona와만 가능
- 메시지 길이 제한: 4000 자
- Rate Limiting: 분당 최대 30개 메시지
- 세션 보존: 90일 후 자동 삭제

## AI Integration
- **Provider**: OpenAI GPT API
- **Model**: `gpt-4`
- **Context Window**: 최근 메시지 20개 포함
- **Streaming**: 대기 중 (향후 실시간 스트리밍 추가)
