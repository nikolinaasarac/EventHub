import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { VenueType } from '../../venue-types/entities/venue-type.entity';

@Entity('venues')
export class Venue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ length: 255 })
  address: string;

  @ManyToOne(() => City, (city) => city.venues, { nullable: false })
  city: City;

  @ManyToOne(() => VenueType, (venueType) => venueType.venues, {
    nullable: false,
  })
  venueType: VenueType;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: false })
  latitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: false })
  longitude: number;

  @Column({ type: 'int', nullable: true })
  capacity: number;

  @Column({ length: 255, nullable: true })
  imageUrl: string;

  @Column({ length: 150, nullable: true })
  phone: string;

  @Column({ length: 150, nullable: true })
  email: string;

  @Column({ length: 150, nullable: true })
  websiteUrl: string;

  @Column({ length: 150, nullable: true })
  instagram: string;

  @Column({ length: 150, nullable: true })
  facebook: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
