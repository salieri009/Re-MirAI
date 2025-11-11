# Re:MirAI Frontend

A modern, maintainable frontend application for the Re:MirAI project, built with Vue 3, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Global Theme System**: Centralized styling with Tailwind CSS and CSS variables
- 🔄 **Mock Data Support**: Development-ready with mock data, easy to switch to real API
- 🏗️ **Modular Architecture**: Clean separation of concerns with stores, services, and components
- 📱 **Responsive Design**: Mobile-first approach with mystical/sci-fi theme
- 🔐 **Demo Authentication**: Mock authentication ready for Google OAuth integration

## Project Structure

```
src/
├── assets/          # Global styles and assets
├── components/      # Reusable components
│   └── common/      # Common UI components (Button, PersonaCard, etc.)
├── mocks/          # Mock data for development
├── router/         # Vue Router configuration
├── services/       # API services (with mock mode)
├── stores/         # Pinia stores (auth, persona, ritual, quest)
└── views/          # Page components
    ├── auth/       # Authentication pages
    ├── chat/       # Chat interface
    ├── ritual/     # Ritual/survey pages
    ├── room/       # Persona room
    ├── summon/     # Summoning scene
    ├── survey/     # Survey pages
    └── social/     # Social features
```

## Getting Started

### Prerequisites

- Node.js 20.19.0+ or 22.12.0+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Type Checking

```bash
npm run type-check
```

## Switching to Real API

The project uses mock data by default. To switch to the real API:

1. **Update API Service** (`src/services/api.ts`):
   - Set `USE_MOCK_DATA = false`
   - Uncomment the actual API calls
   - Remove or comment out mock implementations

2. **Update Authentication** (`src/stores/auth.ts` and `src/views/auth/LoginView.vue`):
   - Replace mock Google OAuth with actual Google OAuth implementation
   - Update the `loginWithGoogle` method

3. **Environment Variables**:
   - Create `.env` file with `VITE_API_BASE_URL=your-api-url`

## Key Features

### Global Theme

The theme is centralized in:
- `tailwind.config.js`: Color palette, animations, and design tokens
- `src/assets/main.css`: Global styles and utility classes

### Mock Data

All mock data is in `src/mocks/data.ts`. The API service automatically uses mock data when `USE_MOCK_DATA = true`.

### State Management

Pinia stores are organized by domain:
- `auth`: User authentication and profile
- `persona`: Persona data and chat
- `ritual`: Survey/ritual management
- `quest`: Quest system

## Pages

- **Landing** (`/`): Welcome page with "How It Works"
- **Login** (`/login`): Google OAuth login (demo mode)
- **Dashboard** (`/dashboard`): Main user hub
- **Ritual Hub** (`/ritual`): Create and manage surveys
- **Summoning** (`/summon`): Persona summoning scene
- **Persona Room** (`/room/:personaId`): Persona's room with quests
- **Chat** (`/chat/:personaId`): Chat with Persona
- **Survey** (`/survey/:ritualId`): Public survey page
- **Public Profile** (`/profile/:userId`): Shareable persona profile

## Development Notes

- All API calls are commented with `// TODO: Uncomment when backend is ready`
- Mock data simulates API delays for realistic development
- Authentication is in demo mode - no actual Google OAuth yet
- All components use the global theme system for consistency

## Tech Stack

- **Vue 3** (Composition API)
- **TypeScript**
- **Vite**
- **Pinia** (State management)
- **Vue Router**
- **Tailwind CSS**
- **GSAP** (For animations - ready for summoning scene)
