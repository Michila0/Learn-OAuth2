import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/googleAuthGuard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  //api/auth/google/login
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authenticated' };
  }

  //api/auth/google/callback
  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect(@Req() req: Request) {
    return { msg: 'OK', user: req.user };
  }
}