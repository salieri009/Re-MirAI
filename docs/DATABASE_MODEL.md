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

## 3. 예정(주석 처리) 엔티티
- ChatSession
- ChatMessage

## 4. 관계
- User 1:N Survey
- User 1:N Persona
- Survey 1:N SurveyResponse
- User와 Survey는 onDelete: Cascade

## 5. 인덱스 전략(현재)
- Survey: userId, status, shareableLink
- SurveyResponse: surveyId
- Persona: userId
- User: email(unique)

## 6. 마이그레이션 규칙
1. schema.prisma 수정
2. npx prisma migrate dev --name <name>
3. npx prisma generate
4. 서버 재시작
