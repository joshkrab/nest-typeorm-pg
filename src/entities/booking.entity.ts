import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Invitation } from './invitation.entity';
import { Room } from './room.entity';
import { Schedule } from './schedule.entity';
import { User } from './user.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  bookingId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ nullable: true })
  duration: string;

  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'user_FK' })
  user: number;

  @ManyToOne(() => Room, (room) => room.bookings)
  @JoinColumn({ name: 'room_FK' })
  room: Room;

  @OneToOne(() => Schedule)
  @JoinColumn({ name: 'schedule_FK' })
  schedule: Schedule;

  @OneToMany(() => Invitation, (invitation) => invitation.booking)
  invitations: Invitation[];
}
