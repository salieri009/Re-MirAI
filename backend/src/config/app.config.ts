import { registerAs } from '@nestjs/config';

/**
 * Unified Application Configuration
 * 
 * All environment variables are accessed through this single configuration object.
 * Use ConfigService.get<T>('app.key') pattern throughout the application.
 */
export default registerAs('app', () => ({
    // Server
    port: parseInt(process.env.PORT || '3001', 10),
    nodeEnv: process.env.NODE_ENV || 'development',

    // Frontend
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',

    // Database
    databaseUrl: process.env.DATABASE_URL,

    // JWT
    jwt: {
        secret: process.env.JWT_SECRET || 'your-secret-key',
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
        refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    },

    // OAuth - Google
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackUrl: process.env.GOOGLE_CALLBACK_URL || '/auth/google/callback',
    },

    // OAuth - Kakao
    kakao: {
        clientId: process.env.KAKAO_CLIENT_ID || '',
        clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
        callbackUrl: process.env.KAKAO_CALLBACK_URL || '/auth/kakao/callback',
    },

    // OAuth - Apple
    apple: {
        clientId: process.env.APPLE_CLIENT_ID || '',
        teamId: process.env.APPLE_TEAM_ID || '',
        keyId: process.env.APPLE_KEY_ID || '',
        privateKey: process.env.APPLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
        callbackUrl: process.env.APPLE_CALLBACK_URL || '/auth/apple/callback',
    },

    // OpenAI
    openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    },
}));
