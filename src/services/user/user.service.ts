import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ERole, IUser } from 'src/interfaces/user.interface';
import { User } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

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

  async findOne(login: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { login } });
  }

  async create(user: IUser): Promise<User> {
    return this.userRepo.save(user);
  }
}
