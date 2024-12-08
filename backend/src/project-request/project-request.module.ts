import { Module } from '@nestjs/common';
import { ProjectRequestController } from './project-request.controller';
import { ProjectRequestService } from './project-request.service';
import { UploadService } from 'src/upload/upload.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [ProjectRequestController],
  providers: [ProjectRequestService, UploadService, ConfigService]
})
export class ProjectRequestModule {}
