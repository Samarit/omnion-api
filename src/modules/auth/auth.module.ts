import { Logger, Module } from '@nestjs/common';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, Logger],
  exports: [JwtModule],
})
export class AuthModule {
  constructor() {}
}
