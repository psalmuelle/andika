import { IsString, IsNumber, IsArray, IsEnum } from 'class-validator';
import { RequestType, RequestStatus } from '@prisma/client';



export class CreateRequestDto {
  @IsNumber()
  userId: number;

  @IsEnum(RequestType)
  requestType: RequestType;

  @IsEnum(RequestStatus)
  status: RequestStatus;
}

export class CreateArticleRequestDto {
  @IsNumber()
  numberOfArticles: number;

  @IsString()
  audience: string;

  @IsString()
  primaryGoal: string;

  @IsArray()
  contentStructure: string[];

  @IsString()
  idealLength: string;

  @IsString()
  usefulLinks: string;

  @IsString()
  proposedTopics: string;
}

export class CreateWhitepaperRequestDto {
  @IsString()
  productName: string;

  @IsString()
  niche: string;
}

export class CreateApiDocRequestDto {
  @IsString()
  startupName: string;

  @IsString()
  industry: string;

  @IsString()
  docType: string;

  @IsString()
  usefulLinks: string;
}

export class CreateEditingRequestDto {
  @IsArray()
  drafts: string[];

  @IsString()
  usefulLinks: string;

  @IsString()
  info: string;
}
