import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  async login(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const { login, password } = req.headers;

    const result = await this.authService.signIn(login, password);

    if (result && result.token) {
      console.log({ result });
      res.cookie('token', result.token, { httpOnly: true, secure: false });

      return result;
    }
  }
}
