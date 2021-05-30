import { Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BOOKING_REPOSITORY } from '../../core/constants';
import { Booking } from './entities/booking.entity';
import { GeneralHelpers } from '../../common/helpers/general.helpers';
import { JwtPayload } from '../auth/interfaces/jwt-payload';

@Injectable()
export class BookingsService {
  constructor(
    @Inject(BOOKING_REPOSITORY) private bookingRepository: typeof Booking,
    private readonly generalHelper: GeneralHelpers,
  ) {}
  async create(
    createBookingDto: CreateBookingDto,
    user: JwtPayload,
  ): Promise<Booking> {
    return await this.bookingRepository.create<Booking>({
      ...createBookingDto,
      booking_code: `BKN-${this.generalHelper.generateRandomCharacters(6)}`,
      booked_by: user.id,
    });
  }

  async findAll(): Promise<Booking[]> {
    return await this.bookingRepository.findAll<Booking>();
  }

  async findOne(id: string): Promise<Booking> {
    return this.bookingRepository.findOne<Booking>({ where: { id } });
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<[number, Booking[]]> {
    return await this.bookingRepository.update(updateBookingDto, {
      where: { id },
    });
  }

  async checkIn(id: string): Promise<[number, Booking[]]> {
    return await this.bookingRepository.update<Booking>(
      { status: 'Checked-In', time_checked_in: Date.now() },
      { where: { id } },
    );
  }

  async checkOut(id: string): Promise<[number, Booking[]]> {
    return await this.bookingRepository.update<Booking>(
      { status: 'Checked-Out', time_checked_out: Date.now() },
      { where: { id } },
    );
  }
}
