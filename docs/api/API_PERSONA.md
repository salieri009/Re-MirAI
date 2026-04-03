# Re:MirAI API - Persona (Digital Mirror Synthesis)

설문 응답을 분석하여 Digital Persona(디지털 미러)를 생성하고 관리.

## Persona Lifecycle

```
Survey Responses 수집 → OpenAI 분석 → Persona 생성 → Chat 준비 → Conversation
```

## Endpoints

### Synthesize Persona (Persona 생성/분석)
- **Endpoint**: `POST /personas/synthesize`
- **Status**: ✅ **Implemented**
- **Auth**: JWT 필수
- **Body**:
  ```json
  {
    "surveyId": "survey_uuid",
    "mode": "FATED",
    "modifiers": {
      "archetype": "The Sage"
    }
  }
  ```
- **Response**:
  ```json
  {
    "id": "persona_uuid",
    "name": "Mirror of ReMir",
    "archetype": "The Sage",
    "rarity": "RARE",
    "stats": {
      "charisma": 62,
      "intellect": 81,
      "kindness": 74,
      "energy": 58
    },
    "greeting": "Welcome back.",
    "bondLevel": 0,
    "createdAt": "2026-03-22T10:15:00.000Z"
  }
  ```
- **Errors**:
  - `400 BAD_REQUEST`: 입력 오류, 응답 수 부족, 상태 불가
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `404 NOT_FOUND`: Survey 없음

### Get All Personas
- **Endpoint**: `GET /personas`
- **Status**: ✅ **Implemented**
- **Auth**: JWT 필수
- **Query Parameters**: 없음
- **Response**:
  ```json
  [
    {
      "id": "persona_uuid",
      "name": "Mirror of ReMir",
      "archetype": "The Sage",
      "rarity": "RARE",
      "stats": {
        "charisma": 62,
        "intellect": 81,
        "kindness": 74,
        "energy": 58
      },
      "greeting": "Welcome back.",
      "bondLevel": 2,
      "createdAt": "2026-03-22T10:15:00.000Z"
    }
  ]
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료

### Get Persona Details
- **Endpoint**: `GET /personas/:id`
- **Status**: ✅ **Implemented**
- **Auth**: JWT 필수
- **Path Parameters**:
  - `id`: Persona ID
- **Response**:
  ```json
  {
    "id": "persona_uuid",
    "name": "Mirror of ReMir",
    "archetype": "The Sage",
    "rarity": "RARE",
    "stats": {
      "charisma": 62,
      "intellect": 81,
      "kindness": 74,
      "energy": 58
    },
    "greeting": "Welcome back.",
    "bondLevel": 2,
    "systemPrompt": "You are a digital mirror...",
    "surveyId": "survey_uuid",
    "createdAt": "2026-03-22T10:15:00.000Z"
  }
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `404 NOT_FOUND`: Persona 없음

### Generate Persona Card (F-004)
- **Endpoint**: `POST /personas/:id/card`
- **Status**: 📘 **Specified (Implementation Target)**
- **Auth**: JWT 필수 (Owner)
- **Path Parameters**:
  - `id`: Persona ID
- **Body**: 없음
- **Response (Draft)**:
  ```json
  {
    "imageUrl": "https://cdn.remirai.app/cards/persona_uuid.png",
    "publicProfileUrl": "https://remirai.app/p/persona_uuid",
    "expiresAt": "2026-04-10T10:15:00.000Z"
  }
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `403 FORBIDDEN`: Owner가 아님
  - `404 NOT_FOUND`: Persona 없음

## Persona Data Model (현재 API 응답)

### Synthesis Mode
- `FATED`: 자동 archetype
- `ALCHEMIC`: 사용자 modifier 반영

### System Prompt
- OpenAI에 전달되는 사용자 정의 프롬프트
- Persona의 성격/톤 정의
- 각 Persona마다 고유하며 상세 조회에서 반환됨

## AI Integration
- **Provider**: OpenAI GPT API
- **Model**: `gpt-4` 또는 `gpt-3.5-turbo`
- **Synthesis Process**: 
  1. Survey responses 수집
  2. 응답 분석 및 trait extraction
  3. System prompt 생성
  4. Persona 저장 후 채팅 준비

## 보안
- Owner만 자신의 Persona 접근 가능
- Survey responses는 암호화되어 저장
- System prompt는 서버에만 저장되고 클라이언트 전송 안 됨
