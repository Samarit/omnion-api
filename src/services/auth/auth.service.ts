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
    const userDB = await this.userService.findOne(login);
    if (!userDB) {
      return {
        status: 404,
        message: 'User not found',
      };
    }
    const user = {
      login: userDB.login,
      password: userDB.password,
    };
    console.log('USER: ', user);

    if (!user) {
      throw new UnauthorizedException('User not found');
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
