import { ERole } from 'src/interfaces/user.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  login: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ERole, default: ERole.USER })
  role: ERole;
}
