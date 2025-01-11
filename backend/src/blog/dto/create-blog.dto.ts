import { IsString, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsString()
  excerpt: string;

  @IsOptional()
  @IsString()
  featuredImage?: string;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}