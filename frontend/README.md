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

### Current Status: Mock Mode

All API calls currently use mock data. The actual API calls are commented out and can be easily enabled when the backend is ready.

### How to Enable Real API

1. Update `.env.local` with your API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

2. Uncomment the actual API calls in `src/lib/api/*.ts` files

3. Remove or comment out the mock implementations

### API Modules

- `auth.ts` - Authentication (Google OAuth)
- `survey.ts` - Survey creation and responses (F-001)
- `persona.ts` - Persona synthesis (F-002)
- `chat.ts` - Chat interface (F-003)
- `social.ts` - Social features (F-005)
- `quest.ts` - Gamification (F-006)

## 🔐 Authentication

### Demo Mode

Currently, authentication is in demo mode. Clicking "Continue with Google" will:
1. Call the mock auth API
2. Store user data in localStorage
3. Redirect to dashboard

### Enabling Real Authentication

1. Set up Google OAuth credentials
2. Uncomment the real API call in `src/lib/api/auth.ts`
3. Update the login flow in `src/app/page.tsx`

## 📄 Pages

### Landing Page (`/`)
- Hero section with value proposition
- "How It Works" section
- Google login button (demo mode)

### Dashboard (`/dashboard`)
Three states:
1. **Awaiting Responses** - Shows progress bar, share button
2. **Ready for Synthesis** - Shows "Create Persona" button
3. **Active Persona** - Shows persona card, chat button

### Survey Page (`/s/[id]`)
- Question wizard with progress bar
- Likert scale inputs
- Anonymous submission

### Persona Page (`/p/[id]`)
- Persona card display
- Stats visualization
- Chat button

### Chat Interface (`/chat/[id]`)
- Real-time chat interface (mock)
- Message history
- Input area

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

- All API calls use mock data by default
- Authentication is in demo mode
- WebSocket chat is mocked (real implementation ready in comments)
- Design tokens follow the Blonix design philosophy
- Components follow Atomic Design principles

## 🔄 Migration to Real Backend

When the backend is ready:

1. **Update Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Set `NEXT_PUBLIC_API_URL`

2. **Enable API Calls**
   - Uncomment actual API calls in `src/lib/api/*.ts`
   - Remove mock implementations

3. **Enable Authentication**
   - Uncomment Google OAuth in `src/lib/api/auth.ts`
   - Update login flow

4. **Enable WebSocket**
   - Uncomment WebSocket code in `src/lib/api/chat.ts`
   - Install `socket.io-client` if needed

## 📚 Related Documentation

- [Frontend Development Plan](../../docs/03-planning/09-Frontend-Development-Plan.md)
- [API Specification](../../docs/03-planning/06-API-Specification.md)
- [Page Architecture](../../docs/03-planning/02-Page-Architecture.md)
