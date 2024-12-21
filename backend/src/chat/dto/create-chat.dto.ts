import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class CreateChatDto {
  @IsNumber()
  senderId: number;

  @IsNumber()
  receiverId: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}
