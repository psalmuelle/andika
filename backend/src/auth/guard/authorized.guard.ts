import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthorizedGaurd implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request:Request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
