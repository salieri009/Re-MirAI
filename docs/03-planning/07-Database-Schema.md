# Database Schema Design

**최종 업데이트:** 2025-11-24  
**버전:** 1.0.0  
**상태:** Draft

---

## 1. 개요

### 1.1. 목적
본 문서는 Re:MirAI의 PostgreSQL 데이터베이스 스키마를 정의하며, 모든 테이블, 관계, 인덱스 전략, 마이그레이션 정책을 포함합니다.

### 1.2. 관련 문서
- [Technical Specification](05-Technical-Specification.md) - 시스템 아키텍처
- [API Specification](06-API-Specification.md) - API 엔드포인트

### 1.3. 설계 원칙
| 원칙 | 설명 |
| :--- | :--- |
| **정규화** | 3NF 준수, 데이터 중복 최소화 |
| **인덱싱** | 쿼리 패턴 기반 인덱스 설계 |
| **마이그레이션** | Prisma Migrate 사용, 롤백 가능 |
| **타입 안전성** | Prisma 스키마로 타입 자동 생성 |

---

## 2. ERD (Entity Relationship Diagram)

```mermaid
erDiagram
    User ||--o{ Survey : creates
    User ||--o{ Persona : owns
    User ||--o{ Quest : has
    Survey ||--o{ Response : receives
    Survey ||--|| Persona : generates
    Persona ||--o{ Message : chats
    Quest ||--|| QuestReward : gives
    
    User {
        uuid id PK
        string email UK
        string name
        datetime createdAt
    }
    
    Survey {
        uuid id PK
        uuid userId FK
        string status
        datetime createdAt
    }
    
    Response {
        uuid id PK
        uuid surveyId FK
        json content
        datetime createdAt
    }
    
    Persona {
        uuid id PK
        uuid userId FK
        uuid surveyId FK
        string name
        string archetype
        string rarity
        json stats
        text systemPrompt
        datetime createdAt
    }
    
    Message {
        uuid id PK
        uuid personaId FK
        string role
        text content
        datetime createdAt
    }
    
    Quest {
        uuid id PK
        uuid userId FK
        string type
        string status
        datetime completedAt
    }
    
    QuestReward {
        uuid id PK
        uuid questId FK
        int crystals
        datetime claimedAt
    }
```

---

## 3. Prisma Schema

### 3.1. User
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  surveys   Survey[]
  personas  Persona[]
  quests    Quest[]
  createdAt DateTime @default(now())
  
  @@index([email])
}
```

**인덱스 전략:**
- `email`: 로그인 조회 (UNIQUE 자동 인덱스)

---

### 3.2. Survey
```prisma
model Survey {
  id          String     @id @default(uuid())
  userId      String
  user        User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  status      String     @default("ACTIVE") // "ACTIVE", "COMPLETED"
  responses   Response[]
  persona     Persona?
  createdAt   DateTime   @default(now())
  
  @@index([userId])
  @@index([status])
}
```

**인덱스 전략:**
- `userId`: 사용자의 Survey 목록 조회
- `status`: 활성 Survey 필터링

**비즈니스 로직:**
- Survey 삭제 시 관련 Response도 Cascade 삭제 (익명성 보장)

---

### 3.3. Response
```prisma
model Response {
  id        String   @id @default(uuid())
  surveyId  String
  survey    Survey   @relation(fields: [surveyId], references: [id], onDelete: Cascade)
  content   Json     // { "answers": [...] }
  ipHash    String?  // 중복 제출 방지용 (SHA256)
  createdAt DateTime @default(now())
  
  @@index([surveyId])
  @@index([ipHash, surveyId]) // 복합 인덱스: 중복 체크
}
```

**인덱스 전략:**
- `surveyId`: Response 조회
- `[ipHash, surveyId]`: 중복 제출 방지 (24시간 내 동일 IP)

**익명성 보장:**
- IP는 해시로 저장 (원본 저장 금지)
- `content`는 JSON으로 저장 (응답자 식별 불가)

---

### 3.4. Persona
```prisma
model Persona {
  id           String   @id @default(uuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  surveyId     String   @unique
  survey       Survey   @relation(fields: [surveyId], references: [id])
  name         String
  archetype    String
  rarity       String   // "SSR", "SR", "R"
  stats        Json     // { "charisma": 85, ... }
  systemPrompt String   @db.Text
  messages     Message[]
  createdAt    DateTime @default(now())
  
  @@index([userId])
  @@index([archetype])
}
```

**인덱스 전략:**
- `userId`: 사용자의 Persona 목록 조회
- `archetype`: Archetype별 통계 분석

**제약:**
- 1 Survey = 1 Persona (`surveyId` UNIQUE)

---

### 3.5. Message
```prisma
model Message {
  id        String   @id @default(uuid())
  personaId String
  persona   Persona  @relation(fields: [personaId], references: [id], onDelete: Cascade)
  role      String   // "user", "persona"
  content   String   @db.Text
  createdAt DateTime @default(now())
  
  @@index([personaId, createdAt])
}
```

**인덱스 전략:**
- `[personaId, createdAt]`: 대화 기록 조회 (시간순 정렬)

**쿼리 최적화:**
- 최근 10~20개만 조회 (Cursor Pagination)

---

### 3.6. Quest
```prisma
model Quest {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  type        String   // "DAILY_LOGIN", "SHARE_CARD"
  status      String   @default("ACTIVE") // "ACTIVE", "COMPLETED"
  reward      QuestReward?
  completedAt DateTime?
  createdAt   DateTime @default(now())
  
  @@index([userId, status])
}
```

**인덱스 전략:**
- `[userId, status]`: 사용자의 활성 Quest 조회

---

### 3.7. QuestReward
```prisma
model QuestReward {
  id        String   @id @default(uuid())
  questId   String   @unique
  quest     Quest    @relation(fields: [questId], references: [id], onDelete: Cascade)
  crystals  Int
  claimedAt DateTime @default(now())
}
```

**ACID 보장:**
- Quest 완료 + Reward 지급은 트랜잭션으로 처리

---

## 4. 마이그레이션 전략

### 4.1. Prisma Migrate
```bash
# 개발 환경
npx prisma migrate dev --name init

# 프로덕션 환경
npx prisma migrate deploy
```

### 4.2. 롤백 정책
- 각 마이그레이션은 `up.sql` / `down.sql` 포함
- 프로덕션 배포 전 스테이징 테스트 필수

### 4.3. Seeding
```typescript
// prisma/seed.ts
async function main() {
  // 기본 Quest 타입 생성
  // 테스트 User 생성
}
```

---

## 5. 쿼리 최적화

### 5.1. N+1 문제 방지
```typescript
// Bad
const surveys = await prisma.survey.findMany();
for (const survey of surveys) {
  const responses = await prisma.response.findMany({ where: { surveyId: survey.id } });
}

// Good
const surveys = await prisma.survey.findMany({
  include: { responses: true }
});
```

### 5.2. Pagination
```typescript
// Cursor 기반 (권장)
const messages = await prisma.message.findMany({
  where: { personaId },
  take: 20,
  cursor: lastMessageId ? { id: lastMessageId } : undefined,
  orderBy: { createdAt: 'desc' }
});
```

---

## 6. 백업 및 복구

### 6.1. 백업 주기
- **일일 백업:** 자정 (UTC)
- **보관 기간:** 30일

### 6.2. 복구 절차
```bash
# Dump
pg_dump -U postgres -d remirai > backup.sql

# Restore
psql -U postgres -d remirai < backup.sql
```

---

## 7. 모니터링

### 7.1. Slow Query 탐지
- 1초 이상 쿼리 로깅
- Prisma Metrics 활용

### 7.2. Connection Pool
```env
DATABASE_URL="postgresql://user:pass@host:5432/db?connection_limit=20"
```

---

## 8. 참고 자료

- [Prisma Documentation](https://www.prisma.io/docs)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Don%27t_Do_This)
- [Database Indexing Explained](https://use-the-index-luke.com/)
