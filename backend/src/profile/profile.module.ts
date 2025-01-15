import { Module } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { OnboardingMessage } from './onboarding-template.email';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MailModule],
  controllers: [ProfileController],
  providers: [ProfileService, MailService, OnboardingMessage, ConfigService],
})
export class ProfileModule {}
