import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Venue } from '../../venues/entities/venue.entity';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Venue, (venue) => venue.city)
  venues: Venue[];
}
