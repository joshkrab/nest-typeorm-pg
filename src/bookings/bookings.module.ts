import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { Booking } from 'src/entities/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { RedisService } from 'src/users/redis.service';
import { RedisEntity } from 'src/entities/redis.entity';

@Module({
  providers: [BookingsService, UsersService, RedisService],
  controllers: [BookingsController, UsersController],
  imports: [
    TypeOrmModule.forFeature([Booking, User, RedisEntity]),
    UsersModule,
  ],
  exports: [BookingsService],
})
export class BookingsModule {}
