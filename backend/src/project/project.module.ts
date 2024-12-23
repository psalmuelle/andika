import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MailgunModule } from 'src/mailgun/mailgun.module';
import { MailgunService } from 'src/mailgun/mailgun.service';
import { UploadService } from 'src/upload/upload.service';
import { ConfigService } from '@nestjs/config';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
  imports: [MailgunModule, NotificationsService],
  controllers: [ProjectController],
  providers: [ProjectService, MailgunService, UploadService, ConfigService],
})
export class ProjectModule {}
