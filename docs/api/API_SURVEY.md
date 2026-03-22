# Re:MirAI API - Survey (Ritual Lifecycle)

Ritual(설문조사) 생성, 공개, 응답 제출, 상태 관리.

## Survey Lifecycle

```
User 생성 → Survey 공개링크 → Anonymous Responder 응답 제출 → 피드백 수집 → Persona 합성
```

## Endpoints

### Create Survey (Ritual 생성)
- **Endpoint**: `POST /surveys`
- **Status**: ✅ **Implemented**
- **Auth**: JWT 필수
- **Body**:
  ```json
  {
    "title": "What do you think of me?",
    "description": "A survey to discover my digital mirror",
    "questions": [
      {
        "text": "What's my greatest strength?",
        "type": "text"
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "survey_xyz",
      "title": "What do you think of me?",
      "ownerId": "user_123",
      "status": "draft",
      "publicLink": "s/AbC1De2F3",
      "createdAt": "2026-03-22T10:00:00Z"
    }
  }
  ```
- **Errors**:
  - `400 VALIDATION_ERROR`: Invalid survey data
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료

### Get My Surveys
- **Endpoint**: `GET /surveys/my`
- **Status**: ✅ **Implemented**
- **Auth**: JWT 필수
- **Query Parameters**: 없음
- **Response**:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "survey_xyz",
        "title": "What do you think of me?",
        "status": "active",
        "responseCount": 5,
        "createdAt": "2026-03-22T10:00:00Z"
      }
    ]
  }
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료

### Get Public Survey (응답자용)
- **Endpoint**: `GET /surveys/:linkOrId/public`
- **Status**: ✅ **Implemented**
- **Auth**: 불필요
- **Path Parameters**:
  - `linkOrId`: 공개링크(`s/AbC1De2F3`) 또는 Survey ID
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "survey_xyz",
      "title": "What do you think of me?",
      "description": "Tell me what you really think",
      "questions": [
        {
          "id": "q1",
          "text": "What's my greatest strength?",
          "type": "text"
        }
      ]
    }
  }
  ```
- **Errors**:
  - `404 NOT_FOUND`: Survey 없음
  - `403 FORBIDDEN`: Survey 비활성화됨

### Submit Survey Response (익명 응답)
- **Endpoint**: `POST /surveys/:id/responses`
- **Status**: ✅ **Implemented**
- **Auth**: 불필요 (Browser Fingerprinting으로 추적)
- **Path Parameters**:
  - `id`: Survey ID
- **Body**:
  ```json
  {
    "responses": [
      {
        "questionId": "q1",
        "answer": "Your leadership and vision"
      }
    ]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Response submitted successfully"
  }
  ```
- **Errors**:
  - `400 VALIDATION_ERROR`: 응답 형식 오류
  - `404 NOT_FOUND`: Survey 없음
  - `409 CONFLICT`: 중복 응답 (same fingerprint)

### Get Survey Status (Owner 전용)
- **Endpoint**: `GET /surveys/:id/status`
- **Status**: ✅ **Implemented**
- **Auth**: JWT 필수 (Owner만)
- **Path Parameters**:
  - `id`: Survey ID
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": "survey_xyz",
      "status": "active",
      "totalResponses": 12,
      "uniqueFingerprints": 12,
      "canSythnesize": true,
      "readyForPersona": true
    }
  }
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `403 FORBIDDEN`: Owner가 아님
  - `404 NOT_FOUND`: Survey 없음

## Data Models

### Survey Status
- `draft`: 작성 중
- `active`: 공개 중
- `closed`: 응답 종료
- `synthesized`: Persona 생성 완료

### Question Types
- `text`: 단답형
- `scale`: 스케일 (1-5)
- `multiple`: 객관식
- `ranking`: 순위 매기기

## 응답자 추적
- Browser Fingerprinting (User-Agent, IP, Device)
- 중복 응답 방지
- Anonymous (개인 정보 없음)
