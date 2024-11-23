import { Module } from '@nestjs/common';
import { MailgunModule } from 'src/mailgun/mailgun.module';
import { MailgunService } from 'src/mailgun/mailgun.service';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { OnboardingMessage } from './onboarding-template.email';

@Module({
  imports: [ MailgunModule],
  controllers: [ ProfileController],
  providers: [ProfileService, MailgunService, OnboardingMessage]
})
export class ProfileModule {}
