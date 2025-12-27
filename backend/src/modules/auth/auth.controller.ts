import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request, Response } from 'express';
import type { User } from '@prisma/client';
import { AuthService } from './auth.service';

interface OAuthRequest extends Request {
  user: User;
}

/**
 * Auth Controller
 * 
 * Handles OAuth 2.0 authentication for multiple providers:
 * - Google
 * - Kakao (Korean users)
 * - Apple (iOS users)
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  private getFrontendUrl(): string {
    return process.env.FRONTEND_URL || 'http://localhost:3000';
  }

  // ============= GOOGLE =============

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // Initiates Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: OAuthRequest, @Res() res: Response) {
    const tokens = this.authService.login(req.user);
    const frontendUrl = this.getFrontendUrl();

    // Redirect to frontend with tokens
    const callbackUrl = new URL('/auth/callback', frontendUrl);
    callbackUrl.searchParams.set('access_token', tokens.access_token);
    callbackUrl.searchParams.set('refresh_token', tokens.refresh_token);
    callbackUrl.searchParams.set('provider', 'google');

    return res.redirect(callbackUrl.toString());
  }

  // ============= KAKAO =============

  @Get('kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuth() {
    // Initiates Kakao OAuth flow
  }

  @Get('kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoAuthCallback(@Req() req: OAuthRequest, @Res() res: Response) {
    const tokens = this.authService.login(req.user);
    const frontendUrl = this.getFrontendUrl();

    // Redirect to frontend with tokens
    const callbackUrl = new URL('/auth/callback', frontendUrl);
    callbackUrl.searchParams.set('access_token', tokens.access_token);
    callbackUrl.searchParams.set('refresh_token', tokens.refresh_token);
    callbackUrl.searchParams.set('provider', 'kakao');

    return res.redirect(callbackUrl.toString());
  }

  // ============= APPLE =============

  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  async appleAuth() {
    // Initiates Apple OAuth flow
  }

  @Post('apple/callback') // Apple uses POST for callback
  @UseGuards(AuthGuard('apple'))
  async appleAuthCallback(@Req() req: OAuthRequest, @Res() res: Response) {
    const tokens = this.authService.login(req.user);
    const frontendUrl = this.getFrontendUrl();

    // Redirect to frontend with tokens
    const callbackUrl = new URL('/auth/callback', frontendUrl);
    callbackUrl.searchParams.set('access_token', tokens.access_token);
    callbackUrl.searchParams.set('refresh_token', tokens.refresh_token);
    callbackUrl.searchParams.set('provider', 'apple');

    return res.redirect(callbackUrl.toString());
  }

  // ============= TOKEN MANAGEMENT =============

  @Post('refresh')
  @HttpCode(200)
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  @HttpCode(200)
  async logout() {
    // In a stateless JWT system, logout is handled client-side
    // by removing tokens from storage.
    // Server-side logout could invalidate refresh tokens in DB if needed.
    return { message: 'Logout successful' };
  }
}

