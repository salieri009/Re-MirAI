import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-kakao';
import { AuthService } from '../auth.service';

/**
 * Kakao OAuth Strategy
 * 
 * Implements Passport strategy for Kakao social login.
 * Used for Korean users who prefer Kakao authentication.
 */
@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(
        private authService: AuthService,
        configService: ConfigService,
    ) {
        super({
            clientID: configService.get<string>('app.kakao.clientId') ?? '',
            clientSecret: configService.get<string>('app.kakao.clientSecret') ?? '',
            callbackURL: configService.get<string>('app.kakao.callbackUrl') ?? '/auth/kakao/callback',
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: any, user?: any) => void,
    ): Promise<void> {
        try {
            const user = await this.authService.validateKakaoUser(profile);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    }
}

