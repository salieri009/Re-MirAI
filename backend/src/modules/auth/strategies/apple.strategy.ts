import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-apple';
import { AuthService } from '../auth.service';

/**
 * Apple Sign-In Strategy
 * 
 * Implements Passport strategy for Apple Sign-In.
 * Required for iOS app submissions to App Store.
 */
@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy, 'apple') {
    constructor(
        private authService: AuthService,
        configService: ConfigService,
    ) {
        super({
            clientID: configService.get<string>('app.apple.clientId') ?? '',
            teamID: configService.get<string>('app.apple.teamId') ?? '',
            keyID: configService.get<string>('app.apple.keyId') ?? '',
            privateKeyString: configService.get<string>('app.apple.privateKey') ?? '',
            callbackURL: configService.get<string>('app.apple.callbackUrl') ?? '/auth/apple/callback',
            scope: ['name', 'email'],
            passReqToCallback: false,
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        idToken: any,
        profile: Profile,
        done: VerifyCallback,
    ): Promise<void> {
        try {
            // Apple profile structure is different - email comes from idToken
            const appleProfile = {
                id: idToken.sub,
                email: idToken.email,
                name: profile?.name?.firstName
                    ? `${profile.name.firstName} ${profile.name.lastName || ''}`.trim()
                    : null,
            };

            const user = await this.authService.validateAppleUser(appleProfile);
            done(null, user);
        } catch (error) {
            done(error as Error, undefined);
        }
    }
}

