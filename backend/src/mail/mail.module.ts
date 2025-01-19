import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 600000,
        limit: 5,
      },
    ]),
  ],
  providers: [MailService, ConfigService],
  controllers: [MailController],
  exports: [MailService],
})
export class MailModule {}
