import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/localStrategy';
import { GoogleStrategy } from './strategies/oauthStrategy';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { MailgunModule } from 'src/mailgun/mailgun.module';
import { MailgunService } from 'src/mailgun/mailgun.service';
import { VerifyEmailTemplate } from './email/verify-email.template';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    MailgunModule,
    PassportModule.register({ session: true }),
  ],
  providers: [
    AuthService,
    ConfigService,
    LocalStrategy,
    GoogleStrategy,
    MailgunService,
    VerifyEmailTemplate,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
