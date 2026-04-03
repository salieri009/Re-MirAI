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
    "minResponses": 3
  }
  ```
- **Response**:
  ```json
  {
    "id": "survey_uuid",
    "userId": "user_uuid",
    "status": "COLLECTING",
    "title": "What do you think of me?",
    "shareableLink": "http://localhost:3000/ritual/AbC1De2F3",
    "minResponses": 3,
    "responseCount": 0,
    "createdAt": "2026-03-22T10:00:00.000Z",
    "expiresAt": "2026-04-21T10:00:00.000Z"
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
  [
    {
      "id": "survey_uuid",
      "userId": "user_uuid",
      "status": "READY",
      "title": "What do you think of me?",
      "shareableLink": "http://localhost:3000/ritual/AbC1De2F3",
      "minResponses": 3,
      "responseCount": 5,
      "createdAt": "2026-03-22T10:00:00.000Z",
      "expiresAt": "2026-04-21T10:00:00.000Z"
    }
  ]
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료

### Get Public Survey (응답자용)
- **Endpoint**: `GET /surveys/:linkOrId/public`
- **Status**: ✅ **Implemented**
- **Auth**: 불필요
- **Path Parameters**:
  - `linkOrId`: 공개 링크 토큰 또는 Survey ID
- **Response**:
  ```json
  {
    "id": "survey_uuid",
    "title": "What do you think of me?",
    "expiresAt": "2026-04-21T10:00:00.000Z",
    "questions": [
      {
        "id": "q1",
        "type": "text",
        "question": "What is one word that describes this person?"
      }
    ]
  }
  ```
- **Errors**:
  - `404 NOT_FOUND`: Survey 없음 또는 응답 불가 상태

### Submit Survey Response (익명 응답)
- **Endpoint**: `POST /surveys/:id/responses`
- **Status**: ✅ **Implemented**
- **Auth**: 불필요
- **Path Parameters**:
  - `id`: Survey ID
- **Body**:
  ```json
  {
    "answers": {
      "q1": "calm",
      "q2": "The Leader"
    },
    "fingerprintHash": "hashed_fingerprint_value"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Response submitted successfully"
  }
  ```
- **Errors**:
  - `400 BAD_REQUEST`: 요청 형식 오류 또는 중복 응답
  - `404 NOT_FOUND`: Survey 없음

### Get Survey Status (Owner 전용)
- **Endpoint**: `GET /surveys/:id/status`
- **Status**: ✅ **Implemented**
- **Auth**: JWT 필수 (Owner만)
- **Path Parameters**:
  - `id`: Survey ID
- **Response**:
  ```json
  {
    "id": "survey_uuid",
    "status": "READY",
    "responsesCount": 3,
    "canCreatePersona": true,
    "threshold": 3
  }
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `404 NOT_FOUND`: Survey 없음 또는 권한 없음

## Data Models

### Survey Status
- `COLLECTING`: 응답 수집 중
- `READY`: 합성 가능한 응답 수 충족
- `COMPLETED`: Persona 합성 완료
- `ARCHIVED`: 보관

### Question Types (기본 템플릿)
- `text`
- `choice`
- `scale`

## Notes

- Public 설문은 현재 `COLLECTING` 상태에서만 조회됩니다.
- 응답 중복 방지는 `fingerprintHash` 기준으로 처리됩니다.
