import { IsNumber, IsString, IsUrl } from "class-validator"


export class CreateProjectFileDto {
    @IsString()
    hostname: string

    @IsUrl()
    url: string

    @IsNumber()
    projectId: number
}