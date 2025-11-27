# Backend Setup & Migration Guide

## 🚀 Phase 1: Survey Module - Setup Instructions

### Prerequisites
- PostgreSQL database running
- Node.js 18+ installed
- Backend `.env` file configured

### Step 1: Install Dependencies

```bash
cd backend
npm install nanoid
```

### Step 2: Run Database Migration

The schema has been updated with new fields for the Survey module:
- `Survey.title`, `Survey.shareableLink`, `Survey.minResponses`
- `Persona.rarity` (for future persona system)

Run the migration:

```bash
npx prisma migrate dev --name add_survey_fields
```

### Step 3: Generate Prisma Client

```bash
npx prisma generate
```

### Step 4: Start Backend Server

```bash
npm run start:dev
```

The backend should now be running on `http://localhost:3001` with the following endpoints:

## 📡 Available API Endpoints

### Survey Endpoints (Phase 1 - ✅ Implemented)

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/v1/surveys` | ✅ Yes | Create new survey (ritual) |
| GET | `/v1/surveys/my` | ✅ Yes | Get user's surveys |
| GET | `/v1/surveys/:linkOrId/public` | ❌ No | Get public survey for respondents |
| POST | `/v1/surveys/:id/responses` | ❌ No | Submit anonymous response |

### Example API Calls

**Create Survey:**
```bash
curl -X POST http://localhost:3001/v1/surveys \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "What do you think of me?"}'
```

**Submit Response (Anonymous):**
```bash
curl -X POST http://localhost:3001/v1/surveys/SURVEY_ID/responses \
  -H "Content-Type: application/json" \
  -d '{
    "answers": {"q1": "Kind", "q2": "The Leader", "q3": 8},
    "fingerprintHash": "abc123"
  }'
```

## 🔗 Frontend Connection Status

### ✅ Connected APIs
- `frontend/src/lib/api/survey.ts` - Now connected to real backend
- `frontend/src/lib/api/client.ts` - Auth interceptors enabled

### ⏳ Still Using Mocks
- `frontend/src/lib/api/persona.ts` - Phase 2
- `frontend/src/lib/api/chat.ts` - Phase 3

## 🧪 Testing the Integration

### 1. Test Survey Creation
```bash
cd frontend
npm run dev
```

1. Navigate to `/dashboard`
2. Click "Create New Ritual"
3. Check backend logs - you should see POST request to `/v1/surveys`
4. Survey should be created in database

### 2. Test Survey Response Submission
1. Get shareable link from created survey
2. Open link in incognito window
3. Submit a response
4. Check database: `SELECT * FROM survey_responses;`

## 📊 Database Schema (Current State)

```sql
-- Users table (existing)
users (id, email, name, googleId, createdAt, updatedAt)

-- Surveys table (✅ updated)
surveys (
  id, userId, status, 
  title, shareableLink, minResponses,  -- NEW FIELDS
  createdAt, expiresAt
)

-- Survey responses (existing)
survey_responses (id, surveyId, answers, fingerprintHash, submittedAt)

-- Personas (✅ updated)
personas (
  id, userId, surveyId, name, archetype,
  statCharisma, statIntellect, statKindness, statEnergy,
  systemPrompt, greetingMessage, bondLevel,
  rarity,  -- NEW FIELD
  createdAt, updatedAt
)
```

## 🔜 Next Steps (Phase 2: Persona Module)

1. Create Persona module (`nest g module modules/persona`)
2. Implement AI Service with OpenAI integration
3. Add `/v1/personas/synthesize` endpoint
4. Connect frontend `personaApi` to backend

## 🐛 Troubleshooting

### Issue: Migration fails
**Solution:** Check PostgreSQL connection in `.env`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/remirai_dev"
```

### Issue: CORS errors in frontend
**Solution:** Add CORS configuration in `backend/src/main.ts`:
```typescript
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

### Issue: 401 Unauthorized
**Solution:** Ensure JWT token is properly set in localStorage after login:
```javascript
localStorage.setItem('auth_token', 'YOUR_TOKEN');
```

## 📝 Environment Variables

### Backend `.env`
```env
DATABASE_URL="postgresql://user:password@localhost:5432/remirai_dev"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="http://localhost:3000"
```

### Frontend `.env.local`
```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

---

**Status:** Phase 1 (Survey Module) - ✅ Complete & Ready for Testing
**Next:** Phase 2 (Persona Module + AI Integration)
