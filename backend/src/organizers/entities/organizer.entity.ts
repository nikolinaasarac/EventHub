import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Event } from '../../events/entities/event.entity';
import { CreateDateColumn } from 'typeorm';

@Entity('organizers')
export class Organizer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  displayName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  contactEmail: string;

  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Event, (event) => event.organizer)
  events: Event[];

  @CreateDateColumn()
  createdAt: Date;
}
