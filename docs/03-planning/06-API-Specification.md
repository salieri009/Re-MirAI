# API Specification

**최종 업데이트:** 2025-11-25  
**버전:** 1.1.0  
**상태:** Draft

---

## 1. 개요

### 1.1. 목적
본 문서는 Re:MirAI 플랫폼의 RESTful API 명세를 정의합니다. 모든 클라이언트-서버 통신은 이 스펙을 준수해야 합니다.

### 1.2. 관련 문서
- [Technical Specification](05-Technical-Specification.md) - 시스템 아키텍처
- [F-001: Survey System](../02-project-overview/features/F-001-Survey-System.md)
- [F-002: Persona Synthesis](../02-project-overview/features/F-002-Persona-Synthesis.md)
- [F-003: Chat Interface](../02-project-overview/features/F-003-Chat-Interface.md)
- [F-004: Persona Card](../02-project-overview/features/F-004-Persona-Card.md)
- [F-005: Social Features](../02-project-overview/features/F-005-Social-Features.md)
- [F-006: Gamification](../02-project-overview/features/F-006-Gamification.md)

### 1.3. API 설계 원칙
| 원칙 | 설명 |
| :--- | :--- |
| **RESTful** | Resource 기반 URL 설계, HTTP Method 표준 준수 |
| **Versioning** | URL Prefix (`/v1/`) 사용, 하위 호환성 유지 |
| **Stateless** | 모든 요청은 독립적, JWT 기반 인증 |
| **HTTPS Only** | 모든 통신은 TLS 1.2 이상 암호화 필수 |
| **JSON** | Request/Response Body는 `application/json` |

---

## 2. 인증 및 인가

### 2.1. 인증 흐름 (OAuth 2.0 / JWT)

```mermaid
sequenceDiagram
    Client->>+Google: OAuth Login Request
    Google-->>-Client: Authorization Code
    Client->>+API: POST /v1/auth/google/login
    API->>+Google: Verify Token
    Google-->>-API: User Info
    API-->>-Client: { accessToken, refreshToken }
    Client->>API: GET /v1/personas (Header: Authorization: Bearer {accessToken})
    API-->>Client: Persona List
```

### 2.2. 엔드포인트

| Method | Endpoint | 설명 | 인증 필요 |
| :--- | :--- | :--- | :---: |
| `POST` | `/v1/auth/google/login` | Google OAuth 로그인 | No |
| `POST` | `/v1/auth/refresh` | Access Token 갱신 | No |
| `POST` | `/v1/auth/logout` | 로그아웃 (토큰 무효화) | Yes |

#### POST /v1/auth/google/login
**Request Body:**
```json
{
  "idToken": "google_id_token_here"
}
```

**Response (200 OK):**
```json
{
  "accessToken": "eyJhbGciOiJI...",
  "refreshToken": "dGhpc2lzcmVm...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**Errors:**
- `401 Unauthorized`: Invalid Google Token
- `500 Internal Server Error`: Server Error

### 2.3. 인가 (Authorization)
모든 보호된 엔드포인트는 `Authorization` 헤더 필수:
```
Authorization: Bearer {accessToken}
```

---

## 3. Survey System API (F-001)

### 3.1. 엔드포인트

| Method | Endpoint | 설명 | 인증 |
| :--- | :--- | :--- | :---: |
| `POST` | `/v1/surveys` | Survey 생성 | Yes |
| `GET` | `/v1/surveys/:id` | Survey 정보 조회 (Public) | No |
| `POST` | `/v1/surveys/:id/responses` | 응답 제출 (익명) | No |
| `GET` | `/v1/surveys/:id/status` | 진행 상태 조회 (Owner only) | Yes |

#### POST /v1/surveys
**설명:** 새로운 Survey 생성 (FR-001.1)

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "url": "https://remirai.app/s/550e8400-e29b-41d4-a716-446655440000",
  "status": "ACTIVE",
  "createdAt": "2025-11-24T12:00:00Z",
  "expiresAt": "2025-12-24T12:00:00Z"
}
```

**성능 요구사항:** < 1s (NFR-001.2)

#### GET /v1/surveys/:id
**설명:** Survey 메타데이터 및 질문 조회 (공개 액세스)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "questions": [
    {
      "id": 1,
      "type": "likert",
      "text": "이 사람은 사교적인가요?",
      "scale": { "min": 1, "max": 5 }
    }
  ],
  "totalResponses": null
}
```

**Note:** `totalResponses`는 익명성 보호를 위해 Owner에게만 공개 (별도 엔드포인트)

#### POST /v1/surveys/:id/responses
**설명:** 익명 응답 제출 (FR-001.3)

**Request Body:**
```json
{
  "answers": {
    "q1": 4,
    "q2": 5
  },
  "fingerprint": "browser_fingerprint_hash"
}
```

**Response (201 Created):**
```json
{
  "message": "응답이 제출되었습니다."
}
```

**Validation:**
- 중복 제출 방지 (IP/Fingerprint 기반, 24시간)
- 필수 질문 미응답 시 `400 Bad Request`

#### GET /v1/surveys/:id/status
**설명:** Survey 진행 상태 (Owner 전용)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "status": "ACTIVE",
  "responsesCount": 2,
  "canCreatePersona": false,
  "threshold": 3
}
```

---

## 4. Persona API (F-002)

### 4.1. 엔드포인트

| Method | Endpoint | 설명 | 인증 |
| :--- | :--- | :--- | :---: |
| `POST` | `/v1/personas/synthesize` | Persona 생성 (Fated/Alchemic) | Yes |
| `GET` | `/v1/personas` | 내 Persona 목록 | Yes |
| `GET` | `/v1/personas/:id` | Persona 상세 조회 | Yes |

#### POST /v1/personas/synthesize
**설명:** Persona 생성 (FR-002.1~FR-002.4)

**Request Body:**
```json
{
  "surveyId": "550e8400-e29b-41d4-a716-446655440000",
  "mode": "FATED", // or "ALCHEMIC"
  "modifiers": {
    "archetype": "TSUNDERE" // Optional, only for ALCHEMIC
  }
}
```

**Response (200 OK):**
```json
{
  "id": "770e8400-e29b-41d4-a716-446655441111",
  "name": "Luna",
  "archetype": "The Mystic",
  "stats": {
    "charisma": 85,
    "intellect": 92,
    "kindness": 70,
    "energy": 45
  },
  "greeting": "Oh, it's you. The stars foretold your arrival."
}
```

**성능 요구사항:** < 60s (NFR-002.1)

#### GET /v1/personas/:id
**설명:** Persona 상세 정보

**Response (200 OK):**
```json
{
  "id": "uuid",
  "name": "친절한 전략가",
  "archetype": "PROTECTOR",
  "rarity": "SR",
  "stats": {
    "charisma": 85,
    "intellect": 72,
    "kindness": 90
  },
  "createdAt": "2025-11-24T12:00:00Z"
}
```

---

## 5. Chat API (F-003)

### 5.1. 엔드포인트

| Method | Endpoint | 설명 | 인증 |
| :--- | :--- | :--- | :---: |
| `WS` | `/socket.io` | 실시간 채팅 (WebSocket) | Yes |
| `GET` | `/v1/chats/:sessionId/history` | 대화 기록 조회 | Yes |

#### WebSocket Events
**설명:** Persona와 대화 (FR-003.1~FR-003.3)

**Client -> Server (`chat:message`):**
```json
{
  "sessionId": "session-uuid",
  "content": "Hello, how are you today?"
}
```

**Server -> Client (`chat:response`):**
```json
{
  "id": "msg-uuid",
  "content": "I am doing well, thank you for asking!",
  "timestamp": "2025-11-24T12:01:00Z"
}
```

**성능 요구사항:** < 3s (NFR-003.1)

#### GET /v1/chats/:sessionId/history
**Query Parameters:**
- `limit`: 조회할 메시지 수 (기본: 20, 최대: 100)
- `before`: Cursor 기반 페이지네이션

**Response (200 OK):**
```json
{
  "messages": [
    {
      "id": "msg-1",
      "sender": "USER",
      "content": "Hi",
      "createdAt": "..."
    },
    {
      "id": "msg-2",
      "sender": "AI",
      "content": "Hello!",
      "createdAt": "..."
    }
  ]
}
```

---

## 6. Persona Card API (F-004)

### 6.1. 엔드포인트

| Method | Endpoint | 설명 | 인증 |
| :--- | :--- | :--- | :---: |
| `POST` | `/v1/personas/:id/card` | 카드 이미지 생성 | Yes |

#### POST /v1/personas/:id/card
**설명:** 공유용 카드 이미지 생성 (FR-004.1)

**Response (200 OK):**
```json
{
  "imageUrl": "https://cdn.remirai.app/cards/persona-123.png",
  "publicProfileUrl": "https://remirai.app/p/persona-123",
  "expiresAt": "2025-12-24T12:00:00Z"
}
```

**성능 요구사항:** < 2s (NFR-004.1)

---

## 7. Social API (F-005)

### 7.1. 엔드포인트

| Method | Endpoint | 설명 | 인증 |
| :--- | :--- | :--- | :---: |
| `GET` | `/v1/social/compatibility` | 페르소나 궁합 확인 | Yes |
| `GET` | `/v1/social/rooms/:id` | 친구 룸 방문 | Yes |

#### GET /v1/social/compatibility
**설명:** 두 페르소나 간의 궁합 점수 계산 (FR-005.1)

**Query Params:** `targetPersonaId={uuid}`

**Response (200 OK):**
```json
{
  "score": 85,
  "label": "Soulmates",
  "description": "Your high energy complements their calm nature perfectly."
}
```

**성능 요구사항:** < 1s (NFR-005.2)

---

## 8. Gamification API (F-006)

### 8.1. 엔드포인트

| Method | Endpoint | 설명 | 인증 |
| :--- | :--- | :--- | :---: |
| `GET` | `/v1/quests` | 활성 퀘스트 목록 | Yes |
| `POST` | `/v1/quests/:id/claim` | 퀘스트 보상 수령 | Yes |
| `GET` | `/v1/currency/balance` | 보유 크리스털 조회 | Yes |

#### POST /v1/quests/:id/claim
**설명:** 퀘스트 완료 및 보상 수령 (FR-006.1~FR-006.2)

**Response (200 OK):**
```json
{
  "success": true,
  "reward": 50,
  "newBalance": 150
}
```

**보안:** ACID 트랜잭션 필수 (NFR-006.1)

---

## 9. 에러 처리

### 9.1. 표준 에러 응답

**형식:**
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "사용자 친화적 메시지",
    "details": { ... }
  }
}
```

### 9.2. 에러 코드 목록

| 도메인 | 코드 | HTTP | 설명 |
| :--- | :--- | :--- | :--- |
| **Survey** | `SURVEY_001` | 404 | Survey not found or expired |
| | `SURVEY_002` | 403 | Survey access denied |
| | `SURVEY_003` | 429 | Duplicate submission detected |
| **Persona** | `PERSONA_001` | 400 | Insufficient survey responses |
| | `PERSONA_002` | 402 | Premium required for Alchemic Mode |
| | `PERSONA_003` | 500 | LLM Generation Failed |
| **Chat** | `CHAT_001` | 403 | User does not own session |
| | `CHAT_002` | 429 | Rate limit exceeded |
| | `CHAT_003` | 400 | Safety policy violation |
| **Card** | `CARD_001` | 404 | Persona not found |
| **Social** | `SOCIAL_001` | 404 | Target persona not found |
| | `SOCIAL_002` | 403 | Target profile is private |
| **Game** | `GAME_001` | 400 | Quest criteria not met |
| | `GAME_002` | 409 | Reward already claimed |
| | `GAME_003` | 402 | Insufficient funds |

---

## 10. Rate Limiting

### 10.1. 정책

| 엔드포인트 | 제한 | 기준 | 복구 시간 |
| :--- | :--- | :--- | :--- |
| `/v1/auth/*` | 10 req/min | IP | 1분 |
| `/v1/surveys` (POST) | 5 req/hour | User | 1시간 |
| `/v1/chat/messages` | 30 req/min | User | 1분 |
| `/v1/*` (Global) | 100 req/min | User | 1분 |

### 10.2. 응답 헤더
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1700000000
```

---

## 11. 페이지네이션

### 11.1. Cursor 기반 (권장)
**Query Parameters:**
- `limit`: 페이지 크기 (기본: 20, 최대: 100)
- `cursor`: 다음 페이지 Cursor

**Response:**
```json
{
  "data": [...],
  "pagination": {
    "nextCursor": "encoded_cursor",
    "hasMore": true
  }
}
```
