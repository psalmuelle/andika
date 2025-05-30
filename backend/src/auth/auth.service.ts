import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register.dto';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { VerifyEmailTemplate } from './email/verify-email.template';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailService: MailService,
    private emailTemplate: VerifyEmailTemplate,
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) {}

  async createUser(user: RegisterUserDto) {
    try {
      const adminPasskey = await this.configService.get('ADMIN_KEY');
      if (user.isAdmin && user.adminPasskey !== adminPasskey) {
        throw new HttpException(
          'Invalid admin passkey',
          HttpStatus.UNAUTHORIZED,
        );
      }

      if (user.isAdmin && user.adminPasskey === adminPasskey) {
        const admin = await this.userService.findOne(user.email);
        if (admin) {
          throw new HttpException(
            'Admin already exists',
            HttpStatus.BAD_REQUEST,
          );
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newAdmin = await this.prismaService.user.create({
          data: {
            email: user.email,
            password: hashedPassword,
            verified: true,
            verificationCode: null,
            isAdmin: true,
            adminPasskey: 'pass',
          },
        });
        const { password, adminPasskey, ...result } = newAdmin;
        return result;
      }
      const verificationCode = crypto.randomInt(100000, 1000000).toString();

      await this.userService.create({
        ...user,
        verificationCode,
      });

      await this.mailService
        .sendMail(
          user.email,
          'Confirm Your Email for Andika',
          `Your verification code is ${verificationCode}`,
          this.emailTemplate.generateTemplate(verificationCode),
        )
        .catch(async (err) => {
          await this.userService.delete(user.email);
          throw new HttpException(err, HttpStatus.UNAUTHORIZED);
        });

      return {
        emailSent: {
          message: 'OK',
          status: 200,
        },
        redirectUrl: '/auth/verify-email',
      };
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(email: string, code: string) {
    try {
      const user = await this.userService.findOne(email);

      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      if (user.verified === true)
        throw new HttpException(
          'User already verified',
          HttpStatus.BAD_REQUEST,
        );
      if (user.verificationCode !== code)
        throw new HttpException(
          'Invalid verification code',
          HttpStatus.BAD_REQUEST,
        );

      await this.prismaService.user.update({
        where: { email },
        data: {
          verified: true,
          verificationCode: null,
        },
      });
      return {
        message: 'Email verified',
        redirectUrl: '/auth/login',
      };
    } catch (err) {
      throw err;
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user)
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const { password: userPassword, ...result } = user;
      return result;
    }
    throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
  }

  async validateGoogleUser(email: string) {
    const user = await this.userService.findOne(email);
    if (!user) {
      const newUser = await this.prismaService.user.create({
        data: {
          email,
          verified: true,
          verificationCode: null,
        },
      });

      if (!newUser) {
        throw new HttpException(
          'User not created',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return newUser;
    }
    return user;
  }
}
