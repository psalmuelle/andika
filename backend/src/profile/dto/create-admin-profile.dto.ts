import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAdminProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsOptional()
  avatar?: string;
}
