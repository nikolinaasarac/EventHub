import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EventSubcategory } from '../../event-subcategories/entities/event-subcategory.entity';

@Entity('event-categories')
export class EventCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => EventSubcategory, (subcategory) => subcategory.eventCategory)
  subcategories: EventSubcategory[];
}
