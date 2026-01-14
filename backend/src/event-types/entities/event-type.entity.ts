import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event_types')
export class EventType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  icon_key: string;

  @Column()
  color_key: string;
}
