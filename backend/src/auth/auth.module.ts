import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/localStrategy';
import { GoogleStrategy } from './strategies/oauthStrategy';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [UserModule],
  providers: [AuthService, ConfigService, LocalStrategy, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
