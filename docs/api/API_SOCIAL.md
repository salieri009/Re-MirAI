# Re:MirAI API - Social (F-005)

공개 프로필, 호환성, 친구 Room 방문 등 관계형 경험 API입니다.

## Status
- 본 문서는 구현 대상 명세입니다.

## Endpoints

### Get Compatibility
- **Endpoint**: `GET /social/compatibility`
- **Status**: 📘 Specified (Implementation Target)
- **Auth**: JWT 필수
- **Query Parameters**:
  - `targetPersonaId` (string, required)
- **Response (Draft)**:
  ```json
  {
    "score": 82,
    "label": "HARMONIC",
    "description": "상호 보완적 강점이 높은 조합"
  }
  ```
- **Errors**:
  - `400 BAD_REQUEST`: 파라미터 오류
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `404 NOT_FOUND`: 대상 Persona 없음

### Visit Friend Room
- **Endpoint**: `GET /social/rooms/:userId`
- **Status**: 📘 Specified (Implementation Target)
- **Auth**: JWT 필수
- **Path Parameters**:
  - `userId` (string, required)
- **Response (Draft)**:
  ```json
  {
    "userId": "user_uuid",
    "username": "korda",
    "personas": [
      {
        "id": "persona_uuid",
        "name": "Mirror of Korda",
        "archetype": "The Sage"
      }
    ],
    "compatibility": {
      "score": 82,
      "label": "HARMONIC",
      "description": "상호 보완적 강점이 높은 조합"
    }
  }
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `404 NOT_FOUND`: 유저 또는 공개 Room 없음

## Notes
- Room 응답에는 공개 Persona만 포함합니다.
- `compatibility.score`는 0~100 정수로 반환합니다.

## Compatibility Label Rules
- `label`은 아래 집합 중 하나만 허용합니다.
  - `HARMONIC` (score 80~100)
  - `BALANCED` (score 60~79)
  - `CHALLENGING` (score 40~59)
  - `MIRROR` (score 0~39)
- `description`은 각 label에 대응하는 고정 템플릿 또는 i18n 메시지 키를 사용합니다.