import { Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import {
  ACCOUNTS_REPOSITORY,
  BOOKING_REPOSITORY,
  CHECKED_IN,
  CUSTOMER_REPOSITORY,
} from '../../core/constants';
import { Payment } from '../accounts/entities/payment.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Injectable()
export class DashboardService {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY) private accountRepository: typeof Payment,
    @Inject(CUSTOMER_REPOSITORY) private customerRepository: typeof Customer,
    @Inject(BOOKING_REPOSITORY) private bookingRepository: typeof Booking,
  ) {}

  async getStats() {
    const [
      customersCount,
      bookingsCount,
      checkedInCount,
      revenueSum,
    ] = await Promise.all([
      this.customerRepository.count<Customer>(),
      this.bookingRepository.count<Booking>(),
      this.bookingRepository.count<Booking>({ where: { status: CHECKED_IN } }),
      this.accountRepository.sum('amount'),
    ]);
    return { customersCount, bookingsCount, checkedInCount, revenueSum };
  }

  async getDeparturesToday() {
    return await this.bookingRepository.findAll<Booking>({
      where: {
        status: CHECKED_IN,
        end_date: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date().setHours(23, 59, 59)),
        },
      },
      include: [{ model: Customer, attributes: ['name'] }],
    });
  }

  async getNewArrivals() {
    return await this.customerRepository.findAll<Customer>({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date().setHours(23, 59, 59)),
        },
      },
    });
  }
}
