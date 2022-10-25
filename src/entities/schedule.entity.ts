import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum Days {
  monday = 'monday',
  tuesday = 'tuesday',
  wednessday = 'wednessday',
  thursday = 'thursday',
  friday = 'friday',
  saturday = 'saturday',
  sunday = 'sunday',
}

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  scheduleId: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column('enum', { enum: Days })
  days: Days;
}
