import { PaymentStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTimelineDto {
  @IsString()
  @IsOptional()
  amount: string;

  @IsDateString()
  @IsOptional()
  dueDate: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsDateString()
  @IsOptional()
  datePaid: string;
}
