import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async createUser(user: RegisterUserDto) {
    const verificationCode = '232115';
    const newUser = await this.userService.createUser({
      ...user,
      verificationCode,
    });
    return newUser;
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
