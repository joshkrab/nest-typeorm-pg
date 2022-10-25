import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Office } from './office.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  roomId: number;

  @Column()
  name: string;

  @Column()
  floor: number;

  @Column()
  capacity: number;

  @ManyToOne(() => Office, (office) => office.rooms)
  @JoinColumn({ name: 'office_FK' })
  office: Office;

  @OneToMany(() => Booking, (booking) => booking.room)
  bookings: Booking[];
}
