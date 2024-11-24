import { Module } from '@nestjs/common';
import { ProjectRequestController } from './project-request.controller';
import { ProjectRequestService } from './project-request.service';

@Module({
  controllers: [ProjectRequestController],
  providers: [ProjectRequestService]
})
export class ProjectRequestModule {}
