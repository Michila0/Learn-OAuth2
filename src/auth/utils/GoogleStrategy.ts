import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import 'dotenv/config';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:"http://localhost:3001/api/auth/google/redirect",
      scope: ['profile', 'email'],
    });
  }

  async validate(accesToken: string, refreshToken: string, profile: Profile) {
    console.log(accesToken);
    console.log(refreshToken);
    console.log(profile);
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayName: profile.displayName
    });
    console.log("Validate");
    console.log(user);
    return user || null;
  };
}