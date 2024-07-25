import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
    const request = context.switchToHttp().getRequest();
    const decoded = this.jwtService.decode(request.headers.token);
    if (!decoded) {
      this.logger.log('Auth failed');
      throw new UnauthorizedException('Invalid token');
    }

    console.log({ decoded });

    return true;
  }
}
