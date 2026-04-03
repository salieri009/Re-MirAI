# Re:MirAI API - Gamification (F-006)

퀘스트 진행, 보상 수령, 지갑 잔액 조회 API입니다.

## Status
- 본 문서는 구현 대상 명세입니다.

## Endpoints

### Get Active Quests
- **Endpoint**: `GET /quests`
- **Status**: 📘 Specified (Implementation Target)
- **Auth**: JWT 필수
- **Response (Draft)**:
  ```json
  [
    {
      "id": "quest_daily_chat",
      "name": "Daily Bond",
      "title": "대화 3회 달성",
      "description": "오늘 페르소나와 3회 대화하기",
      "type": "daily",
      "reward": 50,
      "progress": 2,
      "target": 3,
      "requirement": 3,
      "completed": false,
      "status": "ACTIVE"
    }
  ]
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료

### Claim Quest Reward
- **Endpoint**: `POST /quests/:questId/claim`
- **Status**: 📘 Specified (Implementation Target)
- **Auth**: JWT 필수
- **Path Parameters**:
  - `questId` (string, required)
- **Response (Draft)**:
  ```json
  {
    "success": true,
    "reward": 50,
    "newBalance": 120
  }
  ```
- **Errors**:
  - `400 BAD_REQUEST`: 완료되지 않은 퀘스트 또는 중복 수령
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료
  - `404 NOT_FOUND`: 퀘스트 없음

### Get Wallet Balance
- **Endpoint**: `GET /currency/balance`
- **Status**: 📘 Specified (Implementation Target)
- **Auth**: JWT 필수
- **Response (Draft)**:
  ```json
  {
    "crystals": 120,
    "premium": false
  }
  ```
- **Errors**:
  - `401 UNAUTHORIZED`: JWT 토큰 없음/만료

## Notes
- `bondLevel` 상승 이벤트(Chat)는 quest progress 집계에 반영됩니다.
- 재화는 `crystals` 단일 통화로 시작하며 `newBalance`는 수령 직후 잔액입니다.

## Reset Policy (Fixed)
- Daily quests reset: 매일 KST 00:00
- Weekly quests reset: 매주 월요일 KST 00:00
- 서버는 KST 기준 계산 결과를 UTC 타임스탬프로 저장/응답합니다.