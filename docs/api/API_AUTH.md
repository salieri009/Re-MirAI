# Re:MirAI API - Authentication (OAuth & Token Management)

OAuth 2.0 기반 멀티 프로바이더 인증 및 토큰 관리.

## OAuth 2.0 Flow

### Google 로그인
- **Initiate**: `GET /auth/google`
  - Google로 리다이렉트, 사용자 승인
  - 콜백 URL: `GET /auth/google/callback`

- **Callback**: `GET /auth/google/callback`
  - ✅ **Implemented**
  - Query Parameters: Authorization code (Google OAuth)
  - Response: Frontend로 리다이렉트
    ```
    {FRONTEND_URL}/auth/callback?accessToken={token}&refreshToken={token}&provider=google
    ```

### Kakao 로그인 (한국 사용자)
- **Initiate**: `GET /auth/kakao`
  - Kakao로 리다이렉트, 사용자 승인
  - 콜백 URL: `GET /auth/kakao/callback`

- **Callback**: `GET /auth/kakao/callback`
  - ✅ **Implemented**
  - Query Parameters: Authorization code (Kakao OAuth)
  - Response: Frontend로 리다이렉트
    ```
    {FRONTEND_URL}/auth/callback?accessToken={token}&refreshToken={token}&provider=kakao
    ```

### Apple 로그인 (iOS 사용자)
- **Initiate**: `GET /auth/apple`
  - Apple로 리다이렉트, 사용자 승인
  - 콜백 URL: `POST /auth/apple/callback` (Apple은 POST 사용)

- **Callback**: `POST /auth/apple/callback`
  - ✅ **Implemented**
  - Body: Apple OAuth response
  - Response: Frontend로 리다이렉트
    ```
    {FRONTEND_URL}/auth/callback?accessToken={token}&refreshToken={token}&provider=apple
    ```

## Token Management

### Refresh Access Token
- **Endpoint**: `POST /auth/refresh`
- **Status**: ✅ **Implemented**
- **Auth**: 불필요 (Refresh Token 사용)
- **Body**:
  ```json
  {
    "refreshToken": "eyJhbGciOi..."
  }
  ```
- **Response**:
  ```json
  {
    "accessToken": "eyJhbGciOi...",
    "refreshToken": "eyJhbGciOi..."
  }
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: Invalid or expired refresh token

### Logout
- **Endpoint**: `POST /auth/logout`
- **Status**: ✅ **Implemented**
- **Auth**: 불필요 (클라이언트 측 토큰 제거)
- **Response**:
  ```json
  {
    "message": "Logout successful"
  }
  ```
- **Notes**: JWT는 stateless 방식이므로 서버 측 로그아웃은 클라이언트에서 토큰 삭제로 구현됨. 선택적으로 Refresh Token을 DB에서 무효화할 수 있음.

## Token Structure

### Access Token
- **Type**: JWT
- **Expires**: 15분 (설정 가능)
- **Claims**: `sub` (user ID), `iat`, `exp`
- **Usage**: `Authorization: Bearer {accessToken}`

### Refresh Token
- **Type**: JWT
- **Expires**: 7일 (설정 가능)
- **Usage**: Token refresh endpoint에서 사용

## 인증 정책
- OAuth 콜백: Browser fingerprinting으로 Anonymous Responder 추적
- Protected Endpoints: JWT Bearer token 필수
- 오류 시: `401 UNAUTHORIZED` 반환
