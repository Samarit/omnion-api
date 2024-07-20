import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { ERole } from 'src/interfaces/user.interface';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should sign in', async () => {
    const result = await service.signIn({
      login: 'test',
      password: 'test',
      role: ERole.USER,
    });
    expect(result).toBeDefined();
  });
});
