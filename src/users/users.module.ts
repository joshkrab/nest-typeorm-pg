import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from '../entities/user.entity';
import { UsersService } from './users.service';
import { Booking } from 'src/entities/booking.entity';
import { RedisEntity } from 'src/entities/redis.entity';
import { RedisService } from './redis.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, RedisService],
  imports: [TypeOrmModule.forFeature([User, Booking, RedisEntity])],
  exports: [UsersService],
})
export class UsersModule {}
