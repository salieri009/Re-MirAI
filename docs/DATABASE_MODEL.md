# Re:MirAI DATABASE MODEL

## 1. 데이터소스
- DB: PostgreSQL
- ORM: Prisma
- 스키마 파일: backend/prisma/schema.prisma

## 2. 핵심 엔티티(현재 스키마 기준)
### User
- id (uuid, PK)
- email (unique)
- name
- googleId/kakaoId/appleId (각 unique, nullable)
- createdAt/updatedAt

### Survey
- id (uuid, PK)
- userId (FK -> User)
- status (COLLECTING/READY/COMPLETED/ARCHIVED)
- title
- shareableLink (unique)
- minResponses (default 3)
- createdAt/expiresAt

### SurveyResponse
- id (uuid, PK)
- surveyId (FK -> Survey)
- answers (Json)
- fingerprintHash
- submittedAt

### Persona
- id (uuid, PK)
- userId (FK -> User)
- surveyId (nullable)
- name, archetype, rarity
- statCharisma/statIntellect/statKindness/statEnergy
- systemPrompt, greetingMessage
- bondLevel
- createdAt/updatedAt

### ChatSession
- id (uuid, PK)
- userId (FK -> User)
- personaId (FK -> Persona)
- startedAt/lastMsgAt

### ChatMessage
- id (uuid, PK)
- sessionId (FK -> ChatSession)
- sender (USER/AI)
- content (Text)
- reactions (Json)
- createdAt

### Wallet (Gamification)
- id (uuid, PK)
- userId (FK -> User, UI)
- crystals, premium
- updatedAt

### Quest & UserQuest (Gamification)
- **Quest**: id, name, title, description, type (daily, weekly), reward, target
- **UserQuest**: id, userId, questId (FK), progress, completed, isClaimed, resetAt (KST 기준 UTC)

## 3. 핵심 모듈 동기화 규칙

### 동기화 상태
- **완료**: 초기 기획된 Survey, Persona, Chat 뿐만 아니라 Social, Gamification(Wallet, Quests) 도메인의 스키마도 `schema.prisma`에 모두 공식 지정됨.

### 마이그레이션 규칙
1. `backend/prisma/schema.prisma` 수정
2. `npx prisma migrate dev --name <descriptive_name>` 실행
3. `npx prisma generate` 필수 실행하여 TypeScript 타입 갱신
4. 모델 변경 시 모듈의 DTO 점검

## 4. 관계
- User 1:N Survey, Persona, ChatSession
- User 1:1 Wallet
- Persona 1:N ChatSession
- ChatSession 1:N ChatMessage
- Quest 1:N UserQuest
- User와 관련된 대다수 엔티티는 onDelete: Cascade (탈퇴 대비)

## 5. 인덱스 전략(현재)
- Survey: userId, status, shareableLink
- SurveyResponse: surveyId
- Persona: userId
- ChatSession: userId, personaId
- ChatMessage: sessionId, createdAt
- UserQuest: userId + questId + resetAt (유니크 제한 복합키)

## 6. 스키마 구성 검증
- 모든 엔티티는 PRD `F-001`부터 `F-006` 명세를 완벽히 충족함.
