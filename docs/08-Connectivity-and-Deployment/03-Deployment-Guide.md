# 03. Deployment Guide

**Version:** 1.0
**Owners:** DevOps + Platform Team
**Scope:** Step-by-step instructions for deploying the Re:MirAI application to Production using Railway and Vercel.

---

## 1. Prerequisites

Before starting the deployment process, ensure you have the following accounts and tools ready:

*   **GitHub Account**: Access to the `Re-MirAI` repository.
*   **Railway Account**: For hosting the Backend (NestJS) and Database (PostgreSQL). [Sign up here](https://railway.app/).
*   **Vercel Account**: For hosting the Frontend (Next.js). [Sign up here](https://vercel.com/).
*   **Google Cloud Console**: For configuring Google OAuth credentials.

---

## 2. Backend Deployment (Railway)

We will deploy the Backend first as the Frontend depends on the API URL.

### 2.1. Create Project & Database
1.  Log in to **Railway**.
2.  Click **"New Project"** > **"Provision PostgreSQL"**.
3.  Once the database is created, click on the PostgreSQL service card.
4.  Go to the **"Variables"** tab and copy the `DATABASE_URL`. You will need this later.

### 2.2. Deploy NestJS Service
1.  In the same project, click **"New"** > **"GitHub Repo"**.
2.  Select the `Re-MirAI` repository.
3.  Click **"Add Variables"** and configure the following:
    *   `DATABASE_URL`: (Paste the value from step 2.1)
    *   `JWT_SECRET`: Generate a strong random string (e.g., `openssl rand -base64 32`).
    *   `JWT_EXPIRES_IN`: `7d`
    *   `FRONTEND_URL`: `https://your-frontend-domain.vercel.app` (You can update this after deploying the frontend).
    *   `PORT`: `3000` (Railway expects the app to listen on the port defined by this variable).
4.  Go to **"Settings"** > **"Build"**.
    *   **Root Directory**: `/backend`
    *   **Build Command**: `npm run build`
    *   **Start Command**: `npm run start:prod`
5.  Railway will automatically start the build. Once deployed, go to **"Settings"** > **"Networking"** and click **"Generate Domain"**.
6.  **Copy this Domain** (e.g., `remirai-backend-production.up.railway.app`). This is your `NEXT_PUBLIC_API_URL`.

### 2.3. Run Database Migrations
1.  Install the Railway CLI locally: `npm i -g @railway/cli`
2.  Login: `railway login`
3.  Link your project: `railway link`
4.  Run migration: `railway run "cd backend && npx prisma migrate deploy"`

---

## 3. Frontend Deployment (Vercel)

### 3.1. Import Project
1.  Log in to **Vercel**.
2.  Click **"Add New..."** > **"Project"**.
3.  Import the `Re-MirAI` repository.

### 3.2. Configure Build Settings
1.  **Framework Preset**: Select **Next.js**.
2.  **Root Directory**: Click "Edit" and select `frontend`.
3.  **Environment Variables**: Add the following:
    *   `NEXT_PUBLIC_API_URL`: `https://<YOUR_RAILWAY_BACKEND_DOMAIN>` (Paste the domain from step 2.2).

### 3.3. Deploy
1.  Click **"Deploy"**.
2.  Vercel will build and deploy the application.
3.  Once complete, you will get a production URL (e.g., `re-mir-ai.vercel.app`).

---

## 4. Post-Deployment Configuration

### 4.1. Update Backend CORS
1.  Go back to your **Railway** project > Backend Service > **Variables**.
2.  Update `FRONTEND_URL` with your actual Vercel domain (e.g., `https://re-mir-ai.vercel.app`).
3.  Railway will automatically redeploy the backend with the new configuration.

### 4.2. Configure Google OAuth
1.  Go to **Google Cloud Console** > **APIs & Services** > **Credentials**.
2.  Edit your OAuth 2.0 Client ID.
3.  Add your Vercel domain to **"Authorized JavaScript origins"**:
    *   `https://re-mir-ai.vercel.app`
4.  Add the callback URL to **"Authorized redirect URIs"**:
    *   `https://re-mir-ai.vercel.app/api/auth/callback/google` (or whatever your callback path is).

---

## 5. Verification

1.  Open your Vercel URL.
2.  **Test Connectivity**: The application should load without errors.
3.  **Test Login**: Try logging in with Google.
4.  **Test API**: Check the Network tab in DevTools to ensure requests are hitting your Railway backend (`https://...up.railway.app`).

---

## 6. Troubleshooting

| Issue | Solution |
| :--- | :--- |
| **CORS Error** | Check `FRONTEND_URL` in Railway variables. Ensure it matches your Vercel domain exactly (no trailing slash). |
| **Database Connection Error** | Verify `DATABASE_URL` in Railway variables. Ensure the PostgreSQL service is healthy. |
| **Build Fails (Frontend)** | Check Vercel logs. Ensure `npm install` succeeded and there are no linting errors. |
| **Build Fails (Backend)** | Check Railway logs. Ensure `npm run build` passes locally. |
