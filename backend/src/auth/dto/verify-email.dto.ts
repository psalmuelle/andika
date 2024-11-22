import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class VerifyUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  code: string;
}
