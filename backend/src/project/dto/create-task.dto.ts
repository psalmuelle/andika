import { TaskStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  task: string;

  @IsNumber()
  projectId: number;

  @IsDateString()
  dueDate: string;
}
