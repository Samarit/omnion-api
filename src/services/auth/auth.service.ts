import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signIn() {
    return {
      status: 200,
      message: 'success',
    };
  }
}
