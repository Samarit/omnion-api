import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private logger: Logger,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.token || request.cookies.token;
    if (!token) {
      this.logger.log('Auth failed');
      throw new UnauthorizedException('No token provided');
    }
    const decoded = this.jwtService.decode(token as string);
    if (!decoded) {
      this.logger.log('Auth failed');
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
