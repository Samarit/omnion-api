import { IsString, MinLength } from 'class-validator';

export class loginUserDto {
  @IsString({ message: 'Login must be a string' })
  @MinLength(3, { message: 'Login must be at least 3 characters' })
  login: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(3, { message: 'Password must be at least 3 characters' })
  password: string;
}

export class createUserDto extends loginUserDto {}
