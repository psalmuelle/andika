import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthorizedGaurd } from 'src/auth/guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';

@UseGuards(AuthorizedGaurd)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  async createProfile(@Body() profile: CreateProfileDto, @Req() req: any) {
    try {
      if (!req.user) {
        throw new HttpException('Unauthorized', 401);
      }
      const userId = req.user?.id as number;
      return this.profileService.createProfile(profile, userId);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getProfile(@Req() req: any) {
    try {
      if (!req.user) {
        throw new HttpException('Unauthorized', 401);
      }
      const userId = req.user?.id as number;
      return this.profileService.getProfile(userId);
    } catch (error) {
      throw error;
    }
  }
}
