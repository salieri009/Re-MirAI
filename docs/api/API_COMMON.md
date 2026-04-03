# Re:MirAI API Common

## Base
- Base URL: `/`
- Auth: `Authorization: Bearer <accessToken>`
- Content-Type: `application/json`

## Operational Endpoints

### Root
- **Endpoint**: `GET /`
- **Auth**: 불필요
- **Status**: ✅ Implemented
- **Response**: 문자열 메시지

### Health Check
- **Endpoint**: `GET /health`
- **Auth**: 불필요
- **Status**: ✅ Implemented
- **Response**:
```json
{
  "status": "ok",
  "timestamp": "2026-04-03T10:00:00.000Z",
  "uptime": 123.45
}
```

## Response Shape (현재 구현)
- 대부분의 엔드포인트는 `success/data` 래퍼 없이 DTO 또는 객체를 직접 반환합니다.
- 예외: 일부 엔드포인트는 `message`만 반환합니다.

## Errors
```json
{
  "statusCode": 400,
  "message": ["..."],
  "error": "Bad Request"
}
```

`ValidationPipe`(`whitelist`, `forbidNonWhitelisted`, `transform`)가 전역 적용되어 있어 DTO 위반 시 400 에러를 반환합니다.

## 주요 코드
- 400 VALIDATION_ERROR
- 401 UNAUTHORIZED
- 403 FORBIDDEN
- 404 NOT_FOUND
- 409 CONFLICT
- 500 INTERNAL_ERROR

## 인증 정책
- 보호 라우트는 JWT 필요
- 만료 시 `/auth/refresh`로 access token 갱신

## 버전 정책
- 현재 라우트는 모듈 기준 경로(`/auth`, `/surveys`, `/personas`, `/chats`)
- 라우트 prefix는 현재 명세를 기준으로 고정
