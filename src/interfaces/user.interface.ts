export interface IUser {
  login: string;
  password: string;
  role: ERole;
}

export enum ERole {
  ADMIN = 'admin',
  USER = 'user',
}
