import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { BaseRepository } from './base.repository';

/**
 * User Repository
 * 
 * Handles all database operations for User model.
 */
@Injectable()
export class UserRepository extends BaseRepository<User, Prisma.UserWhereUniqueInput> {
    constructor(prisma: PrismaService) {
        super(prisma, 'user');
    }

    /**
     * Find user by email
     */
    async findByEmail(email: string): Promise<User | null> {
        return this.model.findUnique({ where: { email } });
    }

    /**
     * Find user by Google ID
     */
    async findByGoogleId(googleId: string): Promise<User | null> {
        return this.model.findUnique({ where: { googleId } });
    }

    /**
     * Find user by Kakao ID
     */
    async findByKakaoId(kakaoId: string): Promise<User | null> {
        return this.model.findUnique({ where: { kakaoId } });
    }

    /**
     * Find user by Apple ID
     */
    async findByAppleId(appleId: string): Promise<User | null> {
        return this.model.findUnique({ where: { appleId } });
    }

    /**
     * Link OAuth provider to existing user
     */
    async linkProvider(
        userId: string,
        provider: 'googleId' | 'kakaoId' | 'appleId',
        providerId: string,
    ): Promise<User> {
        return this.model.update({
            where: { id: userId },
            data: { [provider]: providerId },
        });
    }
}
