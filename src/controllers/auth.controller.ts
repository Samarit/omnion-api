import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ERole, IUser } from 'src/interfaces/user.interface';
import { createUserDto, loginUserDto } from 'src/modules/user/user.dto';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Req() req: any,
    @Body() body: loginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { login, password } = body;

    if (!login || !password)
      return { error: 'Login and password are required' };

    const user: IUser = {
      login,
      password,
      role: ERole.USER,
    };

    console.log({ user });

    const token = await this.authService.signIn(user);

    if (token) {
      res.cookie('token', token, { httpOnly: true, secure: false });
    }
    return { token };
  }

  @Post('register')
  async register(@Body() body: createUserDto) {
    const { login, password } = body;

    const user: IUser = {
      login,
      password,
      role: ERole.USER,
    };
    return await this.authService.register(user);
  }
}
