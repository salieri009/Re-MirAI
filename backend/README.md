# Re:MirAI Backend

Backend API server for Re:MirAI built with NestJS, PostgreSQL, and Prisma.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL 15+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Edit .env with your configuration

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

### Development

```bash
# Start development server
npm run start:dev

# The server will run on http://localhost:3001
```

### API Endpoints

#### Operational
- `GET /` - Base endpoint
- `GET /health` - Health check endpoint

#### Auth
- `GET /auth/google`
- `GET /auth/google/callback`
- `GET /auth/kakao`
- `GET /auth/kakao/callback`
- `GET /auth/apple`
- `POST /auth/apple/callback`
- `POST /auth/refresh`
- `POST /auth/logout`

#### Survey
- `POST /surveys`
- `GET /surveys/my`
- `GET /surveys/:linkOrId/public`
- `POST /surveys/:id/responses`
- `GET /surveys/:id/status`

#### Persona
- `POST /personas/synthesize`
- `GET /personas`
- `GET /personas/:id`

#### Chat
- `GET /chats/sessions`
- `POST /chats/sessions`
- `GET /chats/:sessionId/history`
- `POST /chats/:sessionId/messages`

## 📁 Project Structure

```
backend/
├── src/
│   ├── modules/          # Feature modules
│   │   └── auth/         # Authentication module
│   ├── prisma/           # Prisma service and module
│   ├── config/           # Configuration files
│   ├── common/           # Shared utilities
│   └── main.ts           # Application entry point
├── prisma/
│   └── schema.prisma     # Database schema
└── test/                 # Test files
```

## 🗄️ Database

This project uses Prisma as the ORM. To work with the database:

```bash
# View database in Prisma Studio
npx prisma studio

# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

## 🔐 Authentication

The backend uses Google, Kakao, and Apple OAuth with JWT tokens:

- **Access Token**: Valid for 1 hour
- **Refresh Token**: Valid for 7 days

## 📝 Environment Variables

Required environment variables are configured in `.env`:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_REFRESH_SECRET` - Secret key for refresh tokens
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_CALLBACK_URL` - OAuth callback URL
- `KAKAO_CLIENT_ID` - Kakao OAuth client ID
- `KAKAO_CLIENT_SECRET` - Kakao OAuth client secret
- `KAKAO_CALLBACK_URL` - Kakao callback URL
- `APPLE_CLIENT_ID` - Apple OAuth client ID
- `APPLE_TEAM_ID` - Apple Team ID
- `APPLE_KEY_ID` - Apple key ID
- `APPLE_PRIVATE_KEY` - Apple private key
- `APPLE_CALLBACK_URL` - Apple callback URL
- `FRONTEND_URL` - Frontend application URL (for CORS)
- `OPENAI_API_KEY` - OpenAI API key

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📚 Documentation

For detailed development plan, see:
- [Backend Architecture](../docs/BACKEND_ARCHITECTURE.md)
- [API Common](../docs/api/API_COMMON.md)
- [API Auth](../docs/api/API_AUTH.md)
- [API Survey](../docs/api/API_SURVEY.md)
- [API Persona](../docs/api/API_PERSONA.md)
- [API Chat](../docs/api/API_CHAT.md)
- [Database Model](../docs/DATABASE_MODEL.md)

## 🛠️ Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL 15+
- **ORM**: Prisma
- **Authentication**: Passport.js (Google OAuth + JWT)
- **Language**: TypeScript

## 📦 Build

```bash
# Build for production
npm run build

# Start production server
npm run start:prod
```

## 🐛 Troubleshooting

### Prisma Client not found

```bash
npx prisma generate
```

### Database connection errors

Check your `DATABASE_URL` in `.env` file and ensure PostgreSQL is running.

### Port already in use

Change the `PORT` in `.env` or kill the process using port 3001.
