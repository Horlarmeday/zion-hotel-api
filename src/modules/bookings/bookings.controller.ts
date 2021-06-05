import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { HasUserPaid } from './guards/hasUserPaid.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsUserBooked } from './guards/isUserBooked.guard';
import { HasUserCheckedIn } from './guards/hasUserCheckedIn.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(IsUserBooked)
  @Post()
  async createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @Request() req,
  ) {
    const booking = await this.bookingsService.create(
      createBookingDto,
      req.user,
    );
    return { message: 'Room booked', result: booking };
  }

  @Get()
  async findBookings() {
    const bookings = await this.bookingsService.findAll();
    return { message: 'Data retrieved', result: bookings };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const booking = await this.bookingsService.findOneById(id);
    return { message: 'Data retrieved', result: booking };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    const updatedBooking = await this.bookingsService.update(
      id,
      updateBookingDto,
    );
    return { message: 'Data updated', result: updatedBooking };
  }

  @UseGuards(HasUserPaid)
  @Post('/check-in/:id')
  async checkIn(@Param('id') id: string) {
    const booking = await this.bookingsService.checkIn(id);
    return { message: 'Customer checked in', result: booking };
  }

  @UseGuards(HasUserCheckedIn)
  @Post('/check-out/:id')
  async checkOut(@Param('id') id: string) {
    const booking = await this.bookingsService.checkOut(id);
    return { message: 'Customer checked out', result: booking };
  }
}
