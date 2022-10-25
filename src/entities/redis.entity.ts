import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity('redis')
export class RedisEntity extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'Auto inc',
  })
  id: number;

  @Column({ nullable: true })
  key: string;

  @Column({ nullable: true })
  value: string;
}
