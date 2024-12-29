import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthorizedGaurd } from 'src/auth/guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileService } from './profile.service';
import { CreateAdminProfileDto } from './dto/create-admin-profile.dto';

@UseGuards(AuthorizedGaurd)
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  async createProfile(@Body() profile: CreateProfileDto, @Req() req: any) {
    try {
      const userId = req.user?.id as number;
      return this.profileService.createProfile(profile, userId);
    } catch (error) {
      throw error;
    }
  }

  @Post('admin')
  async createAdminProfile(
    @Body() profile: CreateAdminProfileDto,
    @Req() req: any,
  ) {
    try {
      const userId: number = req.user?.id;
      const isAdmin: boolean = req.user?.isAdmin;

      const response = await this.profileService.createAdminProfile({
        userId,
        userIsAdmin: isAdmin,
        profile,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }

  @Get()
  async getProfile(@Req() req: any) {
    try {
      const userId = req.user?.id as number;
      return this.profileService.getProfile(userId);
    } catch (error) {
      throw error;
    }
  }

  @Get('all')
  async getAllProfiles(@Req() req: any) {
    try {
      const userIsAdmin = req.user?.isAdmin as boolean;
      return this.profileService.getAllProfile({ userIsAdmin });
    } catch (err) {
      throw err;
    }
  }

  @Get('admin/get')
  async getAdminProfile(@Req() req: any) {
    try {
      const userId = req.user?.id as number;
      return this.profileService.getAdminProfile(userId);
    } catch (error) {
      throw error;
    }
  }

  @Get('admin/support')
  async getSupportProfile() {
    try {
      return this.profileService.getSupportProfile();
    } catch (err) {
      throw err;
    }
  }

  @Get('admin/get/all')
  async getAllAdminProfiles(@Req() req: any) {
    try {
      const userIsAdmin = req.user?.isAdmin as boolean;
      return this.profileService.getAllAdminProfiles({ userIsAdmin });
    } catch (err) {
      throw err;
    }
  }
}
