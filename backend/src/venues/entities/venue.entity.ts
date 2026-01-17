import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { City } from '../../cities/entities/city.entity';

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

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: false })
  latitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, nullable: false })
  longitude: number;

  @Column({ type: 'int', nullable: true })
  capacity: number;

  @Column({ length: 255, nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
