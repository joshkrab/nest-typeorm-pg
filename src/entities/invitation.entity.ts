import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Booking } from './booking.entity';
import { User } from './user.entity';

@Entity('invitations')
export class Invitation {
  @PrimaryGeneratedColumn()
  invitationId: number;

  @ManyToOne(() => Booking, (booking) => booking.invitations)
  @JoinColumn({ name: 'bookingId_FK' })
  booking: Booking;

  @ManyToOne(() => User, (user) => user.invitations)
  @JoinColumn({ name: 'invitedId_FK' })
  invited: User;
}
