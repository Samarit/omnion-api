import { Module } from '@nestjs/common';
import { ERole, IUser } from 'src/interfaces/user.interface';
import { UserService } from 'src/services/user/user.service';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
