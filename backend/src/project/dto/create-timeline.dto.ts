import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";


export class CreateTimelineDto {
    @IsString()
    amount: string

    @IsDateString()
    dueDate: string

    @IsString()
    status: string

    @IsDateString()
    @IsOptional()
    datePaid: string

    @IsNumber()
    projectId: number
}
