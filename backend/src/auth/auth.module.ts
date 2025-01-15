import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { LocalStrategy } from './strategies/localStrategy';
import { GoogleStrategy } from './strategies/oauthStrategy';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { VerifyEmailTemplate } from './email/verify-email.template';
import { SessionSerializer } from './session.serializer';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    MailModule,
    PassportModule.register({ session: true }),
  ],
  providers: [
    AuthService,
    ConfigService,
    LocalStrategy,
    GoogleStrategy,
    MailService,
    VerifyEmailTemplate,
    SessionSerializer,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
