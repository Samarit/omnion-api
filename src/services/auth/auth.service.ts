import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ERole, IUser } from 'src/interfaces/user.interface';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { UserEntity } from 'src/modules/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(user: IUser) {
    const userDB = await this.userService.findOne(user.login);
    console.log({ userDB });
    if (!userDB)
      throw new NotFoundException({
        status: 404,
        message: 'User not found',
      });

    if (user.password !== userDB.password) {
      throw new UnauthorizedException({
        status: 401,
        message: 'Wrong password',
      });
    }

    try {
      const token = await this.jwtService.signAsync(user);

      return token;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async register(user: UserEntity) {
    await this.userService.create(user);
    const token = await this.jwtService.signAsync(user);
    return token;
  }
}
