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

  @UseGuards(AuthorizedGaurd)
  @Get('status')
  async status(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('email/login')
  async login(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Post('google')
  async googleSignin() {}

  @UseGuards(GoogleAuthGuard)
  @Post('google/callback')
  async googleCallback() {}

  @Post('logout')
  async logout(@Req() req: Request) {
    req.logout((err) => {
      if (err) return err;
    });
    return { message: 'Logged out' };
  }
}
