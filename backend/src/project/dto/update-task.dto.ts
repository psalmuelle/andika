import { TaskStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  task: string;

  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsDateString()
  @IsOptional()
  dueDate: string;
}
