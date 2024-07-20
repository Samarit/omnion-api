import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ERole, IUser } from 'src/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(user: IUser) {
    const userDB = await this.userService.findOne(user.login);
    if (!userDB) {
      return {
        status: 404,
        message: 'User not found',
      };
    }

    if (user.password !== userDB.password) {
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

  async register(user: IUser) {
    console.log({ user });
    try {
      const userDB = await this.userService.create(user);
      const token = await this.jwtService.signAsync(user);
      return {
        status: 200,
        message: 'success',
        token,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 500,
        message: 'Registration error',
      };
    }
  }
}
