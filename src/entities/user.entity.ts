import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Booking } from './booking.entity';
import { Invitation } from './invitation.entity';

enum Roles {
  user = 'user',
  admin = 'admin',
}

enum Status {
  pending = 'pending',
  approved = 'approved',
}

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'Auto inc',
  })
  userId: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column('enum', { enum: Status, nullable: true, default: Status.pending })
  status: Status;

  @Column('enum', { enum: Roles, nullable: true, default: Roles.user })
  role: Roles;

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @OneToMany(() => Invitation, (invitation) => invitation.invited)
  invitations: Invitation[];
}
