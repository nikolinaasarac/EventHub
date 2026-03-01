import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { TicketType } from '../../ticket-types/entities/ticket-type.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.tickets, {
    nullable: false,
  })
  user: User;

  @ManyToOne(() => Event, (event) => event.tickets, {
    nullable: false,
  })
  event: Event;

  @ManyToOne(() => TicketType, (ticketType) => ticketType.tickets, {
    nullable: false,
  })
  ticketType: TicketType;

  @CreateDateColumn()
  createdAt: Date;
}
