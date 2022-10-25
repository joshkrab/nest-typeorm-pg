import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/booking.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { BookingDto } from './dto/booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private repository: Repository<Booking>,
  ) {}

  async addBooking(dto: BookingDto, user: User): Promise<Booking> {
    const newBooking = await this.repository.save({
      title: dto.title,
      description: dto.description,
    });

    user.bookings = [newBooking, ...user.bookings];
    await user.save();

    return newBooking;
  }

  async getBookingById(id: number): Promise<Booking | null> {
    const user = await this.repository.findOne({
      where: { bookingId: id },
      relations: ['scheduleId'],
    });
    if (!user) {
      throw new HttpException('Booking not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
