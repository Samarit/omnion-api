import { Injectable } from '@nestjs/common';
import { ERole, IUser } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
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

  async findOne(login: string): Promise<IUser | undefined> {
    return this.mockUsers.find((user) => user.login === login);
  }
}
