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
cp .env.example .env
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

# The server will run on http://localhost:3000
```

### API Endpoints

- `GET /health` - Health check endpoint
- `GET /v1/auth/google` - Initiate Google OAuth
- `GET /v1/auth/google/callback` - Google OAuth callback
- `POST /v1/auth/refresh` - Refresh access token

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

The backend uses Google OAuth 2.0 for authentication with JWT tokens:

- **Access Token**: Valid for 1 hour
- **Refresh Token**: Valid for 7 days

## 📝 Environment Variables

See `.env.example` for required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT signing
- `JWT_REFRESH_SECRET` - Secret key for refresh tokens
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `GOOGLE_CALLBACK_URL` - OAuth callback URL
- `FRONTEND_URL` - Frontend application URL (for CORS)

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
- [Backend Development Plan](../../docs/03-planning/10-Backend-Development-Plan.md)
- [API Specification](../../docs/03-planning/06-API-Specification.md)
- [Database Schema](../../docs/03-planning/07-Database-Schema.md)

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

Change the `PORT` in `.env` or kill the process using port 3000.
