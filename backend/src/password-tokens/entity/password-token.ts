import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('password_tokens')
export class PasswordToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  token: string;

  @Column({ type: 'timestamp' })
  expiry: Date;

  @Column({ default: false })
  isUsed: boolean;

  @ManyToOne(() => User, (user) => user.passwordTokens)
  user: User;
}
