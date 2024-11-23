import { Controller, Req, Post, UseGuards, Body, Get } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { VerifyUserDto } from './dto/verify-email.dto';
import { AuthorizedGaurd } from './guard';
import { LocalAuthGuard } from './guard';
import { GoogleAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('email/register')
  async register(
    @Body()
    body: RegisterUserDto,
  ) {
    return this.authService.createUser(body);
  }

  @Post('email/verify')
  async verifyEmail(@Body() body: VerifyUserDto) {
    return this.authService.verifyEmail(body.email, body.code);
  }

  @Get('status')
  @UseGuards(AuthorizedGaurd)
  async status(@Req() req: Request) {
    return req.user;
  }

  @Post('email/login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: Request) {
    return {
      user: req.user,
      redirectUrl: '/dashboard',
    };
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleSignin() {
    return 'Redirecting to Google...';
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req: Request) {
    return {
      user: req.user,
      redirectUrl: '/dashboard',
    };
  }

  @Post('logout')
  async logout(@Req() req: Request) {
    req.logout((err) => {
      if (err) return err;
    });
    return { message: 'Logged out' };
  }
}
