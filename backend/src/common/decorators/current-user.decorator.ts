import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

/**
 * CurrentUser Decorator
 * 
 * Extracts the authenticated user from the request object.
 * Use in controller methods to get the current user.
 * 
 * Usage:
 *   @Get('profile')
 *   getProfile(@CurrentUser() user: User) {
 *     return user;
 *   }
 */
export const CurrentUser = createParamDecorator(
    (data: keyof User | undefined, ctx: ExecutionContext): User | any => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user as User;

        if (!user) {
            return null;
        }

        // If a specific field is requested, return only that field
        return data ? user[data] : user;
    },
);
