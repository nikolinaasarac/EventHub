import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Venue } from '../../venues/entities/venue.entity';
import { EventStatus } from '../../../shared/enums/event-status.enum';
import { EventSubcategory } from '../../event-subcategories/entities/event-subcategory.entity';

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
  venue: Venue;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(
    () => EventSubcategory,
    (eventSubcategory) => eventSubcategory.event,
  )
  eventSubcategory: EventSubcategory;

  @Column({
    type: 'enum',
    enum: EventStatus,
    default: EventStatus.ZAKAZAN,
  })
  status: EventStatus;

  @Column({ type: 'jsonb', nullable: true })
  metadata: Record<string, unknown>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

