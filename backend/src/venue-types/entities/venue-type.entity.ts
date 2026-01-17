import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Venue } from '../../venues/entities/venue.entity';

@Entity('venue_types')
export class VenueType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => Venue, (venue) => venue.venueType)
  venues: Venue[];
}
