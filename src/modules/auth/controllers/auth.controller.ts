import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { AuthService } from 'src/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  async login(@Req() req: any) {
    const { login, password } = req.headers;

    const result = await this.authService.signIn(login, password);
    return result;
  }
}
