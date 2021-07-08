import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import {
  BOOKING_REPOSITORY,
  CHECKED_IN,
  CHECKED_OUT,
  PARTIAL,
  PENDING,
} from '../../core/constants';
import { Booking } from './entities/booking.entity';
import { GeneralHelpers } from '../../common/helpers/general.helpers';
import { JwtPayload } from '../auth/interfaces/jwt-payload';
import { Op } from 'sequelize';
import { QueryDto } from '../../core/pipes/query-dto';
import { Customer } from '../customers/entities/customer.entity';
import { Room } from '../rooms/entities/room.entity';
import { AccountsService } from '../accounts/accounts.service';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class BookingsService {
  constructor(
    @Inject(BOOKING_REPOSITORY) private bookingRepository: typeof Booking,
    private readonly generalHelper: GeneralHelpers,
    private readonly accountsService: AccountsService,
    private readonly roomsService: RoomsService,
  ) {}
  async create(
    createBookingDto: CreateBookingDto,
    user: JwtPayload,
  ): Promise<Booking> {
    const { amount_paid, mode_of_payment, amount_due } = createBookingDto;
    const amount_remaining = amount_due - amount_paid;
    try {
      const booking = await this.bookingRepository.create<Booking>({
        ...createBookingDto,
        booking_code: `BKN-${this.generalHelper.generateRandomCharacters(6)}`,
        booked_by: user.id,
        payment_status: amount_remaining > 0 ? 'Partial' : 'Complete',
      });

      await this.accountsService.createPayment(
        { amount: amount_paid, mode_of_payment },
        booking.id,
      );

      return booking;
    } catch (e) {
      throw new HttpException(
        'An error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(
    queryDto: QueryDto,
  ): Promise<{
    total: any;
    pages: number;
    perPage: number;
    docs: any;
    currentPage: number;
  }> {
    let bookings;
    const { currentPage, pageLimit, search, start, end } = queryDto;

    const { limit, offset } = this.generalHelper.getPagination(
      +currentPage,
      +pageLimit,
    );

    if (search) {
      bookings = await this.searchBookings(search, limit, offset);
    } else if (start && end) {
      bookings = await this.getBookingsByDate(limit, offset, start, end);
    } else {
      bookings = await this.getBookings(limit, offset);
    }

    return this.generalHelper.paginate(bookings, currentPage, limit);
  }

  async getBookingsByDate(
    limit: number,
    offset: number,
    start: Date,
    end: Date,
  ) {
    return this.bookingRepository.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
      include: [
        { model: Customer, attributes: ['name'] },
        { model: Room, attributes: ['title'] },
      ],
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
    });
  }

  async searchBookings(search: string, limit: number, offset: number) {
    return await this.bookingRepository.findAndCountAll<Booking>({
      limit: limit,
      offset: offset,
      include: [
        {
          model: Customer,
          attributes: ['name'],
          where: {
            name: {
              [Op.iLike]: `%${search}%`,
            },
          },
        },
        { model: Room, attributes: ['title'] },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async getBookings(limit: number, offset: number) {
    return await this.bookingRepository.findAndCountAll<Booking>({
      limit: limit,
      offset: offset,
      include: [
        { model: Customer, attributes: ['name'] },
        { model: Room, attributes: ['title'] },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async findOneById(id: string): Promise<Booking> {
    return this.bookingRepository.findOne<Booking>({
      where: { id },
      include: [
        { model: Customer, attributes: ['name'] },
        { model: Room, attributes: ['title', 'price'] },
      ],
    });
  }

  async findById(id: string): Promise<Booking> {
    return this.bookingRepository.findByPk<Booking>(id);
  }

  async findOneByCustomerId(customerId: string): Promise<Booking> {
    return this.bookingRepository.findOne<Booking>({
      where: { customer_id: customerId },
    });
  }

  async findOneBooked(customerId: string): Promise<Booking> {
    return this.bookingRepository.findOne<Booking>({
      where: {
        customer_id: customerId,
        [Op.or]: [{ status: CHECKED_IN }, { status: PENDING }],
      },
    });
  }

  async update(
    id: string,
    updateBookingDto: UpdateBookingDto,
  ): Promise<[number, Booking[]]> {
    return await this.bookingRepository.update(updateBookingDto, {
      where: { id },
    });
  }

  async checkIn(id: string): Promise<Booking> {
    const booking = await this.bookingRepository.update<Booking>(
      { status: CHECKED_IN, time_checked_in: Date.now() },
      { where: { id }, returning: true },
    );
    await this.roomsService.updateRoom(booking[1][0].room_id, {
      is_occupied: true,
    });
    return await this.findOneById(id);
  }

  async checkOut(id: string): Promise<Booking> {
    const updatedBooking = await this.bookingRepository.update<Booking>(
      { status: CHECKED_OUT, time_checked_out: Date.now() },
      { where: { id }, returning: true },
    );
    await this.roomsService.updateRoom(updatedBooking[1][0].room_id, {
      is_occupied: false,
    });
    return await this.findOneById(id);
  }

  async addAddons(id: string, addons): Promise<Booking> {
    const booking = await this.findById(id);
    const totalDue =
      +booking.amount_due + this.generalHelper.sumAddonsPrice(addons.addons);

    await this.bookingRepository.update<Booking>(
      { addons: addons.addons, amount_due: totalDue, payment_status: PARTIAL },
      { where: { id }, returning: true },
    );
    return await this.findOneById(id);
  }
}
