import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(user: {
    email: string;
    password: string;
    isAdmin?: boolean;
    adminPasskey?: string;
    verificationCode: string;
  }) {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await this.prisma.user.create({
        data: {
          email: user.email,
          password: hashedPassword,
          verificationCode: user.verificationCode,
          isAdmin: user.isAdmin,
          adminPasskey: user.adminPasskey,
        },
      });
      return newUser;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('Email taken');
        }
      }
      throw err;
    }
  }

  async findOne(email: string) {
    try {
      const user = this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async delete(email: string) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          email: email,
        },
      });
      return user;
    } catch (err) {
      throw err;
    }
  }
}
