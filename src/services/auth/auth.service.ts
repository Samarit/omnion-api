import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(login: string, password: string) {
    const user = await this.userService.findOne(login);
    console.log('USER: ', user);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Wrong password');
    }

    try {
      const token = await this.jwtService.signAsync(user);

      return {
        status: 200,
        message: 'success',
        token,
      };
    } catch (error) {
      console.log({ error });
    }
  }
}
