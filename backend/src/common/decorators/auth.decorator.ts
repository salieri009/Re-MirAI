import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

/**
 * Public Decorator
 * 
 * Marks a route as publicly accessible (no authentication required).
 * Used to override global auth guards for specific endpoints.
 */
export const IS_PUBLIC_KEY = 'isPublic';
import { SetMetadata } from '@nestjs/common';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

/**
 * Auth Decorator
 * 
 * Combines authentication guards for protected routes.
 * Applies JWT authentication by default.
 * 
 * Usage:
 *   @Auth()
 *   @Get('protected')
 *   getProtectedData() {}
 */
export const Auth = () => applyDecorators(UseGuards(JwtAuthGuard));
