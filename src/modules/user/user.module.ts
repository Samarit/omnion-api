import { Module } from '@nestjs/common';
import { ERole, IUser } from 'src/interfaces/user.interface';
import { UserService } from 'src/services/user/user.service';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
