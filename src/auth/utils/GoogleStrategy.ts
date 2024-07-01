import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID:'',
      clientSecret:'',
      callbackURL:"http://localhost:3001/api/auth/google/redirect",
      scope: ['profile', 'email'],
    });
  }

  async validate(accesToken: string, refreshToken: string, profile: Profile) {
    console.log(accesToken);
    console.log(refreshToken);
    console.log(profile);
  }
}