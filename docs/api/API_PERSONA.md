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
    "surveyId": "survey_xyz",
    "name": "My Digital Mirror"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "persona_abc",
      "ownerId": "user_123",
      "surveyId": "survey_xyz",
      "name": "My Digital Mirror",
      "traits": [
        {
          "category": "Strengths",
          "items": ["Leadership", "Vision", "Empathy"]
        },
        {
          "category": "Growth Areas",
          "items": ["Patience", "Delegation"]
        }
      ],
      "systemPrompt": "You are a digital mirror of the user based on 15 survey responses...",
      "status": "ready",
      "createdAt": "2026-03-22T10:15:00Z"
    }
  }
  ```
- **Errors**:
  - `400 VALIDATION_ERROR`: Invalid survey ID or input
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `404 NOT_FOUND`: Survey 없음/응답 부족
  - `409 CONFLICT`: Persona 이미 생성됨

### Get All Personas
- **Endpoint**: `GET /personas`
- **Status**: ✅ **Implemented**
- **Auth**: JWT 필수
- **Query Parameters**: 없음
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "persona_abc",
        "name": "My Digital Mirror",
        "surveyId": "survey_xyz",
        "traits": [...],
        "status": "ready",
        "createdAt": "2026-03-22T10:15:00Z"
      }
    ]
  }
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
    "success": true,
    "data": {
      "id": "persona_abc",
      "ownerId": "user_123",
      "surveyId": "survey_xyz",
      "name": "My Digital Mirror",
      "description": "A comprehensive digital reflection based on 15 feedback responses",
      "traits": [
        {
          "category": "Strengths",
          "items": ["Leadership", "Vision", "Empathy"]
        },
        {
          "category": "Growth Areas",
          "items": ["Patience", "Delegation"]
        },
        {
          "category": "Values",
          "items": ["Integrity", "Innovation", "Collaboration"]
        }
      ],
      "systemPrompt": "You are a digital mirror of the user...",
      "conversationStyle": "supportive, reflective, insightful",
      "status": "ready",
      "createdAt": "2026-03-22T10:15:00Z"
    }
  }
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `403 FORBIDDEN`: Persona Owner가 아님
  - `404 NOT_FOUND`: Persona 없음

## Persona Data Model

### Status
- `synthesizing`: 분석 중 (OpenAI 처리)
- `ready`: 채팅 가능
- `archived`: 보관됨

### Traits
각 Persona는 Survey 응답을 바탕으로 다음 카테고리로 분석됨:
- **Strengths**: 강점/장점
- **Growth Areas**: 개선할 점
- **Values**: 가치관
- **Motivations**: 동기/목표
- **Tendencies**: 성향/습관

### System Prompt
- OpenAI에 전달되는 사용자 정의 프롬프트
- Persona의 성격/톤 정의
- 각 Persona마다 고유함

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
