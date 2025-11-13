# Frontend Spec Phase 1: Project Setup

## 1. Core Stack
- **Framework**: Vue 3 (Composition API with `<script setup>`)
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Styling**: Tailwind CSS
- **API Client**: Axios

## 2. Initialization
1.  **Create Project**: Use Vite to scaffold a new Vue 3 + TypeScript project.
    -   `npm create vite@latest frontend -- --template vue-ts`
2.  **Navigate**: `cd frontend`

## 3. Dependency Installation
1.  **Core Dependencies**: Install essential libraries for the application.
    -   `npm install pinia vue-router axios`
2.  **Development Dependencies**: Install tools for styling and code quality.
    -   `npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms eslint prettier eslint-plugin-vue @typescript-eslint/parser @typescript-eslint/eslint-plugin`

## 4. Configuration
1.  **Tailwind CSS**:
    -   Generate config files: `npx tailwindcss init -p`
    -   Configure `tailwind.config.js`: Set up `content` paths to scan Vue components, and define the design system tokens (colors, fonts, spacing) in the `theme` object.
    -   Create `src/styles/main.css` and import Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`).
    -   Import `main.css` in `src/main.ts`.
2.  **TypeScript (`tsconfig.json`)**:
    -   Configure `compilerOptions.baseUrl` to `.` and `paths` to `{"@/*": ["src/*"]}` to enable absolute imports.
3.  **ESLint (`.eslintrc.cjs`)**:
    -   Set up rules for Vue 3, TypeScript, and Prettier to enforce a consistent code style.
4.  **Prettier (`.prettierrc`)**:
    -   Define formatting rules (e.g., `semi: false`, `singleQuote: true`).

## 5. Environment Variables
-   Create a `.env` file in the project root.
-   Define `VITE_API_BASE_URL=/api/v1`.
-   Define `VITE_MOCK_API=true` for Phase 1. This variable will be used globally to enable/disable mock data services.
