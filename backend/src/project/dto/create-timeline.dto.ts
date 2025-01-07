import { PaymentStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTimelineDto {
  @IsString()
  title: string;

  @IsString()
  amount: string;

  @IsDateString()
  dueDate: string;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsDateString()
  @IsOptional()
  datePaid: string;

  @IsString()
  projectId: string;
}
