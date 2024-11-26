import { IsNumber, IsString } from "class-validator"


export class CreateActivityDto {
    @IsString()
    activity: string

    @IsNumber()
    projectId: number
}