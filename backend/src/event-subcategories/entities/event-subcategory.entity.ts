import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventCategory } from '../../event-categories/entities/event-category.entity';
import { Event } from '../../events/entities/event.entity';

@Entity('event-subcategories')
export class EventSubcategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => EventCategory, (category) => category.subcategories)
  eventCategory: EventCategory;

  @OneToMany(() => Event, (event) => event.eventSubcategory)
  event: Event[];
}
