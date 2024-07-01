import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './stratergies/googleStrategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'google' }),
    ConfigModule,
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController],
  exports: [PassportModule],
})
export class AuthModule {}