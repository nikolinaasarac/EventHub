import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Venue } from '../../venues/entities/venue.entity';
import { EventStatus } from '../../../shared/enums/event-status.enum';
import { EventSubcategory } from '../../event-subcategories/entities/event-subcategory.entity';
import { TicketType } from '../../ticket-types/entities/ticket-type.entity';
import { Review } from '../../reviews/entities/review.entity';
import { Ticket } from '../../tickets/entities/ticket.entity';
import { Organizer } from '../../organizers/entities/organizer.entity';
import { FavoriteEvent } from '../../favorite-events/entities/favorite-event.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @ManyToOne(() => Venue)
  venue: Venue | null;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(
    () => EventSubcategory,
    (eventSubcategory) => eventSubcategory.event,
  )
  eventSubcategory: EventSubcategory | null;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.ZAKAZAN,
  })
  status: EventStatus;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown>;

  @OneToMany(() => Review, (review) => review.event)
  reviews: Review[];

  @OneToMany(() => TicketType, (ticketType) => ticketType.event)
  ticketTypes: TicketType[];

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];

  @ManyToOne(() => Organizer, (organizer) => organizer.events)
  organizer: Organizer;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => FavoriteEvent, (favorite) => favorite.event)
  favoriteEvents: FavoriteEvent[];
}
