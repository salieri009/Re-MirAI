# Re-MirAI Copilot Instructions

## 1. Project Context & Vision
- **Domain**: AI-powered personality discovery platform ("Digital Mirror").
- **Core Concept**: Users create "Rituals" (Surveys) to gather anonymous feedback, which AI synthesizes into a "Persona" (Digital Mirror) they can chat with.
- **Design System**: "Small Switch Palette" (Ver2).
  - **Background**: Mist (`#e6ebf8`) - *Use for all main backgrounds*.
  - **Primary**: Fuchsia (`#d946ef`) - *Accents, buttons, active states*.
  - **Text**: Anchor (`#334155`) - *Primary text for readability*.
  - **Aesthetic**: Glassmorphism, "Sacred/Magical" UI elements, GSAP-driven interactions.

## 2. Feature Documentation Map
*Consult these specific docs before implementing features:*

| Feature | Documentation Path | Key Focus |
|---------|-------------------|-----------|
| **Landing Page** | `docs/FRONTEND_ARCHITECTURE.md` | Page structure, rendering strategy |
| **Auth/Login** | `docs/USER_FLOW.md` | User journey, auth flow |
| **Chat System** | `docs/FRONTEND_ARCHITECTURE.md` | UI architecture, state flow |
| **Persona Room** | `docs/USER_FLOW.md` | Persona experience flow |
| **Summoning** | `docs/USER_FLOW.md` | Synthesis flow and transitions |
| **Survey (Ritual)**| `docs/PRD.md` | Product requirements and constraints |

## 3. Architecture & Tech Stack

### Backend (NestJS)
- **Location**: `backend/`
- **Structure**: Modular (`src/modules/Auth`, `Survey`, `Persona`).
- **Database**: PostgreSQL + Prisma ORM.
  - **Schema**: `backend/prisma/schema.prisma`.
  - **Workflow**: Edit Schema → `npx prisma migrate dev` → `npx prisma generate`.
- **API Style**: RESTful, DTO-driven validation (`class-validator`), Global Exception Filters.
- **Auth**: JWT (Access/Refresh tokens) + Browser Fingerprinting (for anonymous survey responders).

### Frontend (Next.js 14)
- **Location**: `frontend/`
- **Routing**: App Router (`src/app`).
- **State**: 
  - Server State: TanStack Query (React Query).
  - UI State: Zustand.
- **Styling**: CSS Modules / Tailwind (check `src/styles/tokens.css` for variables).
- **Animation**: GSAP (GreenSock) is the standard for complex interactions.

## 4. Critical Developer Workflows

### Database Changes (Strict Protocol)
1. Modify `backend/prisma/schema.prisma`.
2. Run migration: `npx prisma migrate dev --name <descriptive_name>`.
3. **IMMEDIATELY** run: `npx prisma generate` (Required to update TypeScript types).
4. Restart backend server to pick up new client.

### API Integration
- **Client**: `frontend/src/lib/api/client.ts` (Axios instance).
- **Pattern**: Define typed API functions in `frontend/src/lib/api/<module>.ts`.
- **Type Sharing**: Ensure Frontend types match Backend DTOs (manually synced or shared lib).

## 5. Coding Conventions

- **Terminology**: Use "Ritual" for Survey-related UI, but `Survey` in code/DB.
- **IDs**: Use `nanoid` (10 chars) for public-facing shareable links; UUID for internal DB IDs.
- **Validation**: All Backend DTOs must use `class-validator` decorators.
- **Error Handling**: Frontend must handle 401 (Unauthorized) by redirecting to Login, and 404 (Not Found) for invalid Ritual links.
- **Components**: 
  - Default to **Server Components**.
  - Add `'use client'` only when hooks (`useState`, `useEffect`) or event listeners are needed.

## 6. Common Commands
```bash
# Backend
cd backend
npm run start:dev      # Start Dev Server
npx prisma studio      # View Database GUI

# Frontend
cd frontend
npm run dev            # Start Next.js
```
