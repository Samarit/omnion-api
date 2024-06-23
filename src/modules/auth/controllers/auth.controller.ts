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
import { AuthService } from 'src/services/auth/auth.service';

interface LoginDTO {
  login: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Req() req: any,
    @Body() body: LoginDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { login, password } = body;

    if (!login || !password)
      return { error: 'Login and password are required' };

    const result = await this.authService.signIn(login, password);

    if (result && result.token) {
      res.cookie('token', result.token, { httpOnly: true, secure: false });
      return result;
    }
  }
}
