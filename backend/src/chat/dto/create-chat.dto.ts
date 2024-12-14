import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  senderId: number;

  @IsNumber()
  receiverId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
