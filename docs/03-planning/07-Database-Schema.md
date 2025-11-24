# Database Schema Design

**최종 업데이트:** 2025-11-25  
**버전:** 1.1.0  
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
    User ||--|| Wallet : has
    User ||--o{ UserRelation : follows
    Survey ||--o{ Response : receives
    Survey ||--|| Persona : generates
    Persona ||--o{ Message : chats
    Quest ||--|| QuestReward : gives
    Wallet ||--o{ Transaction : records
    
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
        datetime expiresAt
        datetime createdAt
    }
    
    Persona {
        uuid id PK
        uuid userId FK
        uuid surveyId FK
        string name
        string archetype
        json stats
        json modifiers
        datetime createdAt
    }
    
    Wallet {
        uuid id PK
        uuid userId FK
        int balance
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
  wallet    Wallet?
  following UserRelation[] @relation("following")
  followers UserRelation[] @relation("followers")
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
  expiresAt   DateTime?
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
  modifiers    Json?    // { "archetype": "TSUNDERE" } (Alchemic Mode)
  greeting     String?
  systemPrompt String   @db.Text
  messages     Message[]
  createdAt    DateTime @default(now())
  
  @@index([userId])
  @@index([archetype])
}
```

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

---

### 3.6. Social (UserRelation)
```prisma
model UserRelation {
  id          String   @id @default(uuid())
  followerId  String
  follower    User     @relation("following", fields: [followerId], references: [id])
  followingId String
  following   User     @relation("followers", fields: [followingId], references: [id])
  createdAt   DateTime @default(now())

  @@unique([followerId, followingId])
  @@index([followerId])
  @@index([followingId])
}
```

---

### 3.7. Gamification (Wallet, Quest)

```prisma
model Wallet {
  id           String        @id @default(uuid())
  userId       String        @unique
  user         User          @relation(fields: [userId], references: [id])
  balance      Int           @default(0)
  transactions Transaction[]
  updatedAt    DateTime      @updatedAt
}

model Transaction {
  id        String   @id @default(uuid())
  walletId  String
  wallet    Wallet   @relation(fields: [walletId], references: [id])
  amount    Int
  type      String   // "EARN", "SPEND"
  reason    String   // "QUEST_REWARD", "SHOP_PURCHASE"
  createdAt DateTime @default(now())

  @@index([walletId])
}

model Quest {
  id          String   @id @default(uuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  type        String   // "DAILY_LOGIN", "SHARE_CARD"
  frequency   String   @default("ONCE") // "ONCE", "DAILY", "WEEKLY"
  status      String   @default("ACTIVE") // "ACTIVE", "COMPLETED", "CLAIMED"
  reward      QuestReward?
  completedAt DateTime?
  createdAt   DateTime @default(now())
  
  @@index([userId, status])
}

model QuestReward {
  id        String   @id @default(uuid())
  questId   String   @unique
  quest     Quest    @relation(fields: [questId], references: [id], onDelete: Cascade)
  crystals  Int
  claimedAt DateTime @default(now())
}
```

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

---

## 5. 쿼리 최적화

### 5.1. N+1 문제 방지
```typescript
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
