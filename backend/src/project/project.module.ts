import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MailModule } from 'src/mail/mail.module';
import { MailService } from 'src/mail/mail.service';
import { UploadService } from 'src/upload/upload.service';
import { ConfigService } from '@nestjs/config';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [MailModule, NotificationsModule],
  controllers: [ProjectController],
  providers: [
    ProjectService,
    MailService,
    UploadService,
    ConfigService,
    NotificationsService,
  ],
})
export class ProjectModule {}
