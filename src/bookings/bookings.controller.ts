import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { Booking } from 'src/entities/booking.entity';
import { UsersService } from 'src/users/users.service';
import { BookingsService } from './bookings.service';
import { BookingDto } from './dto/booking.dto';

@Controller('booking')
export class BookingsController {
  constructor(
    private bookingService: BookingsService,
    private userService: UsersService,
  ) {}

  @Get('/:id')
  async getBookingById(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.getBookingById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() dto: BookingDto): Promise<Booking> {
    const user = await this.userService.getUserById(dto.userId);
    if (user) {
      return await this.bookingService.addBooking(dto, user);
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
