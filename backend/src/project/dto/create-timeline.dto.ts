import { PaymentStatus } from "@prisma/client";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateTimelineDto {

    @IsString()
    title: string

    @IsString()
    amount: string

    @IsDateString()
    dueDate: string

    @IsEnum(PaymentStatus)
    status: PaymentStatus

    @IsDateString()
    @IsOptional()
    datePaid: string

    @IsNumber()
    projectId: number

    @IsString()
    invoiceId: string

    
}
