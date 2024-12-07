import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProjectStatus } from '@prisma/client';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  projectType: string;

  @IsDateString()
  @IsOptional()
  startDate: string;

  @IsDateString()
  @IsOptional()
  dueDate: string;

  @IsNumber()
  @IsOptional()
  ownerId: number;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status: ProjectStatus;

  @IsString()
  @IsOptional()
  fee: string;
}
