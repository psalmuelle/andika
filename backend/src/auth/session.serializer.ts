import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: any, done: Function) {
    done(null, { id: user.id, email: user.email });
  }
  async deserializeUser(payload: any, done: Function) {
    const user = await this.userService.findOne(payload.email);
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return done(null, userWithoutPassword);
    }
    return done(null, false);
  }
}
