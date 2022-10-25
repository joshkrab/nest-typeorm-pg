import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Room } from './room.entity';

@Entity('offices')
export class Office {
  @PrimaryGeneratedColumn()
  officeId: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Room, (room) => room.office)
  rooms: Room[];
}
