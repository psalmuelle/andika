import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register.dto';
import * as crypto from 'crypto';
import { MailgunService } from '../mailgun/mailgun.service';
import { VerifyEmailTemplate } from './email/verify-email.template';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private mailgunService: MailgunService,
    private emailTemplate: VerifyEmailTemplate,
  ) {}

  async createUser(user: RegisterUserDto) {
    try {
      const verificationCode = crypto.randomInt(100000, 1000000).toString();

      const newUser = await this.userService.create({
        ...user,
        verificationCode,
      });

      await this.mailgunService
        .sendEmail({
          to: user.email,
          subject: 'Confirm Your Email for Andika',
          text: `Your verification code is ${verificationCode}`,
          html: this.emailTemplate.generateTemplate(verificationCode),
        })
        .catch(async (err) => {
          await this.userService.delete(user.email);
          throw new HttpException(err, HttpStatus.UNAUTHORIZED);
        });

      const { password, ...userWithoutPassword } = newUser;

      return {
        user: { ...userWithoutPassword },
        emailSent: {
          message: 'OK',
          status: 200,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const { password: userPassword, ...result } = user;
      return result;
    }
    return null;
  }
}
