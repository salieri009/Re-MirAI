# Re:MirAI API Common

## Base
- Base URL: `/`
- Auth: `Authorization: Bearer <accessToken>`
- Content-Type: `application/json`

## Response Shape
```json
{ "success": true, "data": {} }
```

## Errors
```json
{
  "success": false,
  "error": { "code": "VALIDATION_ERROR", "message": "..." }
}
```

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
- 향후 `/v1` prefix 도입 가능
