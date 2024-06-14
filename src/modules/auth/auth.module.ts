import { Logger, Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Logger],
})
export class AuthModule {
  constructor() {}
}
