import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERole, IUser } from 'src/interfaces/user.interface';
import { UserEntity } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  private readonly mockUserAdmin: IUser = {
    login: 'admin',
    password: 'admin',
    role: ERole.ADMIN,
  };

  private readonly mockUsers: IUser[] = [
    this.mockUserAdmin,
    {
      login: 'user',
      password: 'user',
      role: ERole.USER,
    },
  ];

  async findOne(login: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({ where: { login } });
  }
}
