import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

/**
 * Roles Decorator
 * 
 * Sets required roles for accessing a route.
 * Used with RolesGuard to enforce role-based access control.
 * 
 * Usage:
 *   @Roles('admin', 'moderator')
 *   @Get('admin')
 *   getAdminData() {}
 */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
