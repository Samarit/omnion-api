import { ForbiddenException, Injectable } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { ERole, IUser } from 'src/interfaces/user.interface';
import { UserEntity } from 'src/modules/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
  ) {}

  async findOne(login: string): Promise<UserEntity | null> {
    return this.userRepo.findOne({ where: { login } });
  }

  async create(user: UserEntity): Promise<void> {
    try {
      await this.userRepo.insert(user);
      console.log('Created user: ', user);
    } catch (error) {
      throw error;
    }
  }
}
