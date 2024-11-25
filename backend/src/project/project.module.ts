import { Module } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { MailgunModule } from 'src/mailgun/mailgun.module';
import { MailgunService } from 'src/mailgun/mailgun.service';

@Module({
  imports: [MailgunModule],
  controllers: [ProjectController],
  providers: [ProjectService, MailgunService]
})
export class ProjectModule {}
