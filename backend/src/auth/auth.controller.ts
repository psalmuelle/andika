import { Controller, Req, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { VerifyUserDto } from './dto/verify-email.dto';

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

  @UseGuards(AuthGuard('local'))
  @Post('email/login')
  async login(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AuthGuard('google'))
  @Post('google')
  async googleSignin() {}

  @UseGuards(AuthGuard('google'))
  @Post('google/callback')
  async googleCallback() {}

  @Post('logout')
  async logout(@Req() req: Request) {
    return req.logout((err) => {
      if (err) return err;
      return true;
    });
  }
}

// router.get(
//     "/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
//   );
//   router.get(
//     "/google/callback",
//     passport.authenticate("google", {
//       failureRedirect: `${process.env.FRONTEND_URI}/auth/login?error=500`,
//     }),
//     googleAuth
//   );
