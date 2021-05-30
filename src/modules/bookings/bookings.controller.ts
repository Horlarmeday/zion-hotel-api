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

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

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
    return this.bookingsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(id);
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

  @Post('/check-out/:id')
  async checkOut(@Param('id') id: string) {
    const booking = await this.bookingsService.checkOut(id);
    return { message: 'Customer checked out', result: booking };
  }
}
