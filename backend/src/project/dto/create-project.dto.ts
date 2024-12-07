import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';
import { ProjectStatus } from '@prisma/client';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  projectType: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  dueDate: string;

  @IsNumber()
  ownerId: number;

  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsString()
  fee: string;
}
