import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  fee: string;
}
