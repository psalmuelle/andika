import { IsDateString, IsNumber, IsString } from 'class-validator';

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

  @IsString()
  status: string;

  @IsString()
  fee: string;
}
