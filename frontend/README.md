# Re:MirAI Frontend

This is the frontend application for Re:MirAI, built with Next.js 14, TypeScript, and React.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Pages (Next.js App Router)
│   │   ├── page.tsx            # Landing page
│   │   ├── dashboard/          # Dashboard (3 states)
│   │   ├── s/[id]/             # Survey pages
│   │   ├── p/[id]/             # Persona pages
│   │   └── chat/[id]/          # Chat interface
│   │
│   ├── components/             # Reusable UI components
│   │   ├── atoms/              # Button, Input, Badge
│   │   ├── molecules/          # ProgressBar, QuestionCard, PersonaCard, QuestCard
│   │   └── organisms/          # SurveyWizard
│   │
│   ├── lib/
│   │   ├── api/                # API client (with mock data)
│   │   ├── mock-data/          # Mock data files
│   │   └── providers/          # React Query provider
│   │
│   ├── stores/                 # Zustand stores (auth)
│   └── styles/                 # CSS files and design tokens
│
└── package.json
```

## 🎨 Design System

The project uses a custom design system with CSS variables defined in `src/styles/tokens.css`:

- **Primary Color (Fuchsia):** `#d946ef`
- **Secondary Color (Blue):** `#3b82f6`
- **Spacing:** Consistent spacing scale (xs, sm, md, lg, xl, 2xl, 3xl)
- **Typography:** System font stack with size scale

## 🔌 API Integration

### Current Status

Core modules are wired to backend endpoints via Axios client.

### How to Enable Real API

1. Update `.env.local` with your API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

2. Start backend server and ensure CORS `FRONTEND_URL` matches frontend origin

### API Modules

- `auth.ts` - OAuth callback and token flow
- `survey.ts` - Survey creation, public fetch, response submit, status
- `persona.ts` - Persona synthesis, list, details
- `chat.ts` - Sessions, history, message send
- `social.ts` - Social features (planned/extension)
- `quest.ts` - Gamification (planned/extension)

## 🔐 Authentication

Frontend stores `auth_token`, `auth_refresh_token`, `auth_user` in localStorage.
Axios interceptor behavior:
1. Adds Bearer token to requests.
2. On 401, attempts `POST /auth/refresh`.
3. On refresh failure, clears auth storage and redirects to `/login`.

## 📄 Pages

### Landing Page (`/`)
- Hero section with value proposition
- "How It Works" section
- Login entry

### Dashboard (`/dashboard`)
- Dashboard home and module navigation
- Related pages: `/dashboard/ritual`, `/dashboard/synthesize`, `/dashboard/practice`

### Survey Page (`/s/[id]`)
- Question wizard with progress bar
- Mixed question types from backend default questions
- Anonymous submission

### Persona Page (`/p/[id]`)
- Persona card display
- Stats visualization
- Chat button

### Chat Interface (`/chat/[id]`)
- Chat interface with REST fallback APIs
- Message history
- Input area

### Other Routes
- `/auth/callback`
- `/summon`
- `/social/compatibility`
- `/profile/settings`
- `/s/[id]/thank-you`

## 🧪 Testing

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Development Notes

- API client default base URL: `http://localhost:3001`
- Token refresh and 401 handling are active in Axios interceptor
- Design tokens follow Re:MirAI Small Switch Palette v2
- Components follow Atomic Design principles

## 📚 Related Documentation

- [Frontend Architecture](../docs/FRONTEND_ARCHITECTURE.md)
- [API Common](../docs/api/API_COMMON.md)
- [API Survey](../docs/api/API_SURVEY.md)
- [API Persona](../docs/api/API_PERSONA.md)
- [API Chat](../docs/api/API_CHAT.md)
- [User Flow](../docs/USER_FLOW.md)
