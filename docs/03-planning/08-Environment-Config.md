# Environment Configuration

**최종 업데이트:** 2025-11-24  
**버전:** 1.0.0  
**상태:** Draft

---

## 1. 개요

### 1.1. 목적
본 문서는 Re:MirAI의 환경별 설정 파일, 환경 변수, Secrets 관리 정책을 정의합니다.

### 1.2. 환경 구분
| 환경 | 목적 | URL |
| :--- | :--- | :--- |
| **Development** | 로컬 개발 | `http://localhost:3000` |
| **Staging** | 통합 테스트 | `https://staging.remirai.app` |
| **Production** | 실서비스 | `https://remirai.app` |

---

## 2. Frontend (Next.js)

### 2.1. 환경 변수 (.env.local)

```bash
# API Endpoint
NEXT_PUBLIC_API_URL=http://localhost:4000/v1

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id

# Feature Flags
NEXT_PUBLIC_ENABLE_GAMIFICATION=true

# Analytics (Production Only)
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

### 2.2. 환경별 설정

#### Development (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:4000/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=dev_client_id
NEXT_PUBLIC_ENABLE_GAMIFICATION=false
```

#### Staging (.env.staging)
```bash
NEXT_PUBLIC_API_URL=https://api.staging.remirai.app/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=staging_client_id
NEXT_PUBLIC_ENABLE_GAMIFICATION=true
```

#### Production (.env.production)
```bash
NEXT_PUBLIC_API_URL=https://api.remirai.app/v1
NEXT_PUBLIC_GOOGLE_CLIENT_ID=prod_client_id
NEXT_PUBLIC_ENABLE_GAMIFICATION=true
NEXT_PUBLIC_GA_TRACKING_ID=G-PROD12345
```

### 2.3. 빌드 명령어

```bash
# Development
npm run dev

# Staging Build
npm run build:staging

# Production Build
npm run build
```

**package.json:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:staging": "dotenv -e .env.staging next build"
  }
}
```

---

## 3. Backend (NestJS)

### 3.1. 환경 변수 (.env)

```bash
# Server
PORT=4000
NODE_ENV=development

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/remirai?schema=public"

# JWT
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRES_IN=7d
REFRESH_TOKEN_SECRET=another_secret_key
REFRESH_TOKEN_EXPIRES_IN=30d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# OpenAI
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxx
OPENAI_MODEL=gpt-4o

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# CORS
CORS_ORIGIN=http://localhost:3000
```

### 3.2. 환경별 설정

#### Development (.env.development)
```bash
NODE_ENV=development
PORT=4000
DATABASE_URL="postgresql://user:pass@localhost:5432/remirai_dev"
JWT_SECRET=dev_secret_not_for_production
CORS_ORIGIN=http://localhost:3000
OPENAI_MODEL=gpt-3.5-turbo
```

#### Staging (.env.staging)
```bash
NODE_ENV=staging
PORT=4000
DATABASE_URL="postgresql://user:pass@staging-db:5432/remirai_staging"
JWT_SECRET=${STAGING_JWT_SECRET}
CORS_ORIGIN=https://staging.remirai.app
OPENAI_MODEL=gpt-4o
```

#### Production (.env.production)
```bash
NODE_ENV=production
PORT=4000
DATABASE_URL=${PRODUCTION_DATABASE_URL}
JWT_SECRET=${PRODUCTION_JWT_SECRET}
REFRESH_TOKEN_SECRET=${PRODUCTION_REFRESH_SECRET}
GOOGLE_CLIENT_SECRET=${PRODUCTION_GOOGLE_SECRET}
OPENAI_API_KEY=${PRODUCTION_OPENAI_KEY}
CORS_ORIGIN=https://remirai.app
OPENAI_MODEL=gpt-4o
```

### 3.3. ConfigModule 설정

```typescript
// src/config/configuration.ts
export default () => ({
  port: parseInt(process.env.PORT, 10) || 4000,
  database: {
    url: process.env.DATABASE_URL,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.OPENAI_MODEL || 'gpt-4o',
  },
  cors: {
    origin: process.env.CORS_ORIGIN,
  },
});
```

```typescript
// src/app.module.ts
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
  ],
})
export class AppModule {}
```

---

## 4. Secrets 관리

### 4.1. 로컬 개발
- `.env` 파일 사용 (Git에 커밋 금지)
- `.env.example` 템플릿 제공

**.env.example:**
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/remirai"
JWT_SECRET=your_secret_here
OPENAI_API_KEY=sk-proj-xxxxx
```

### 4.2. Staging/Production
**방법 1: Vercel/Railway 환경 변수**
- Dashboard에서 환경 변수 설정
- 자동 암호화 저장

**방법 2: .env.vault (dotenv-vault)**
```bash
# Secrets 암호화
npx dotenv-vault@latest build

# 배포 시 DOTENV_KEY만 전달
DOTENV_KEY=dotenv://:key_xxxxx
```

### 4.3. 주의사항
- JWT_SECRET은 최소 32자 이상 랜덤 문자열
- Production Secrets는 절대 코드에 하드코딩 금지
- `.env` 파일은 `.gitignore`에 추가 필수

---

## 5. Feature Flags

### 5.1. 환경 변수 기반

```bash
# Frontend
NEXT_PUBLIC_ENABLE_GAMIFICATION=true
NEXT_PUBLIC_ENABLE_ALCHEMIC_MODE=false

# Backend
ENABLE_RATE_LIMITING=true
ENABLE_MODERATION=true
```

### 5.2. 코드 예시

```typescript
// Frontend
const isGamificationEnabled = process.env.NEXT_PUBLIC_ENABLE_GAMIFICATION === 'true';

if (isGamificationEnabled) {
  // Show Quest Widget
}
```

```typescript
// Backend
const isRateLimitEnabled = process.env.ENABLE_RATE_LIMITING === 'true';

if (isRateLimitEnabled) {
  app.use(RateLimiterMiddleware);
}
```

---

## 6. 검증 (Validation)

### 6.1. Joi Schema

```typescript
import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'staging', 'production')
    .required(),
  PORT: Joi.number().default(4000),
  DATABASE_URL: Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  OPENAI_API_KEY: Joi.string().required(),
});
```

```typescript
// app.module.ts
ConfigModule.forRoot({
  validationSchema: validationSchema,
})
```

### 6.2. 시작 시 검증
- 필수 환경 변수 누락 시 앱 시작 차단
- 명확한 에러 메시지 출력

---

## 7. Docker Compose

### 7.1. docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: remirai_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ./backend
    env_file:
      - ./backend/.env.development
    depends_on:
      - db
    ports:
      - "4000:4000"

  frontend:
    build: ./frontend
    env_file:
      - ./frontend/.env.local
    depends_on:
      - backend
    ports:
      - "3000:3000"

volumes:
  postgres_data:
```

---

## 8. CI/CD 환경 변수

### 8.1. GitHub Actions Secrets

```yaml
# .github/workflows/deploy.yml
env:
  DATABASE_URL: ${{ secrets.DATABASE_URL }}
  JWT_SECRET: ${{ secrets.JWT_SECRET }}
  OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
```

### 8.2. 설정 방법
1. GitHub Repository Settings
2. Secrets and variables > Actions
3. New repository secret 추가

---

## 9. 참고 자료

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)
- [dotenv-vault](https://www.dotenv.org/docs/security/env-vault)
- [12 Factor App](https://12factor.net/config)
