import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import type { Profile as GoogleProfile } from 'passport-google-oauth20';
import { PrismaService } from '../../prisma/prisma.service';

export interface TokenPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(profile: GoogleProfile): Promise<User> {
    const primaryEmail = profile.emails?.[0]?.value;

    if (!primaryEmail) {
      throw new UnauthorizedException('Google profile missing email');
    }

    // Find or create user
    let user = await this.prisma.user.findUnique({
      where: { googleId: profile.id },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          googleId: profile.id,
          email: primaryEmail,
          name: profile.displayName ?? null,
        },
      });
    }

    return user;
  }

  login(user: User) {
    const payload: TokenPayload = { sub: user.id, email: user.email };

    // Generate access token (1 hour expiry)
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h',
    });

    // Generate refresh token (7 days expiry)
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: 3600, // 1 hour in seconds
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify<TokenPayload>(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return this.login(user);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
