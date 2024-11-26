import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateTimelineDto {
  @IsString()
  @IsOptional()
  amount: string;

  @IsDateString()
  @IsOptional()
  dueDate: string;

  @IsString()
  status: string;

  @IsDateString()
  @IsOptional()
  datePaid: string;
}
