import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { MailService } from 'src/mail/mail.service';
import { OnboardingMessage } from './onboarding-template.email';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { CreateAdminProfileDto } from './dto/create-admin-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
    private mailService: MailService,
    private onboardingMsg: OnboardingMessage,
  ) {}

  async createProfile(profile: CreateProfileDto, userId: number) {
    try {
      const newProfile = await this.prismaService.profile.create({
        data: {
          name: profile.name,
          company: profile.company,
          position: profile.position,
          avatar: profile.avatar,
          user: {
            connect: {
              id: userId,
            },
          },
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });

      if (!newProfile) {
        throw new HttpException('Profile not created', 400);
      }

      await this.mailService.sendMail(
        newProfile.user.email,
        'Welcome To Andika',
        "Welcome to Andika! We're excited to have you on board. Let's get started by creating your first project. Head over to dashboard to create your first project.",
        this.onboardingMsg.message(newProfile.name),
      );
      return newProfile;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2014' || err.code === 'P2002') {
          throw new HttpException('Profile already exists', 400);
        }
      }
      throw err;
    }
  }

  async createAdminProfile({
    userId,
    userIsAdmin,
    profile,
  }: {
    userId: number;
    userIsAdmin: boolean;
    profile: CreateAdminProfileDto;
  }) {
    try {
      if (!userIsAdmin) {
        throw new HttpException('Unauthorized', 401);
      }

      const newAdminProfile = await this.prismaService.adminProfile.create({
        data: {
          name: profile.name,
          avatar: profile.avatar,
          userId,
          position: profile.position,
        },
      });
      if (!newAdminProfile) {
        throw new HttpException('Profile not created', 400);
      }
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2014' || err.code === 'P2002') {
          throw new HttpException('Profile already exists', 400);
        }
      }
      throw err;
    }
  }

  async getProfile(userId: number) {
    try {
      const userProfile = await this.prismaService.profile.findUnique({
        where: {
          userId: userId,
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });

      if (!userProfile) {
        throw new HttpException('Profile not found', 404);
      }
      return userProfile;
    } catch (err) {
      throw err;
    }
  }

  async getAllProfile({ userIsAdmin }: { userIsAdmin: boolean }) {
    try {
      if (!userIsAdmin) {
        throw new HttpException('Unauthorized', 401);
      }
      const allProfiles = await this.prismaService.profile.findMany({
        include: {
          user: {
            select: {
              email: true,
            },
          },
          _count: {
            select: {
              projects: true,
            },
          },
        },
      });

      return allProfiles;
    } catch (err) {
      throw err;
    }
  }

  async getAdminProfile(userId: number) {
    try {
      const adminProfile = await this.prismaService.adminProfile.findUnique({
        where: {
          userId: userId,
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });

      if (!adminProfile) {
        throw new HttpException('Profile not found', 404);
      }
      return adminProfile;
    } catch (err) {
      throw err;
    }
  }

  async getSupportProfile() {
    try {
      const supportProfile = await this.prismaService.adminProfile.findFirst({
        where: {
          user: {
            email: 'sam@andikadocs.tech',
          },
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });
      return supportProfile;
    } catch (err) {
      throw err;
    }
  }

  async getAllAdminProfiles({ userIsAdmin }: { userIsAdmin: boolean }) {
    try {
      if (!userIsAdmin) {
        throw new HttpException('Unauthorized', 401);
      }

      const adminProfiles = await this.prismaService.adminProfile.findMany({
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      });

      return adminProfiles;
    } catch (err) {
      throw err;
    }
  }
}
