import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { ACCOUNTS_REPOSITORY } from '../../core/constants';
import { Payment } from './entities/payment.entity';
import { Op } from 'sequelize';
import { GeneralHelpers } from '../../common/helpers/general.helpers';
import { QueryDto } from '../../core/pipes/query-dto';
import { Customer } from '../customers/entities/customer.entity';
import { Booking } from '../bookings/entities/booking.entity';
import { Room } from '../rooms/entities/room.entity';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY) private accountRepository: typeof Payment,
    private readonly generalHelper: GeneralHelpers,
  ) {}
  async createPayment(
    createAccountDto: CreateAccountDto,
    id: string,
  ): Promise<Payment> {
    return await this.accountRepository.create<Payment>({
      ...createAccountDto,
      booking_id: id,
    });
  }

  async findPayments(
    queryDto: QueryDto,
  ): Promise<{
    total: any;
    pages: number;
    perPage: number;
    docs: any;
    currentPage: number;
  }> {
    let payments;
    const { currentPage, pageLimit, search, start, end } = queryDto;

    const { limit, offset } = this.generalHelper.getPagination(
      +currentPage,
      +pageLimit,
    );

    if (search) {
      payments = await this.searchPayments(search, limit, offset);
    } else if (start && end) {
      payments = await this.getPaymentsByDate(limit, offset, start, end);
    } else {
      payments = await this.getPayments(limit, offset);
    }

    return this.generalHelper.paginate(payments, currentPage, limit);
  }

  async searchPayments(search: string, limit: number, offset: number) {
    return await this.accountRepository.findAndCountAll<Payment>({
      limit: limit,
      offset: offset,
      include: [
        {
          model: Booking,
          attributes: ['title', 'customer_id', 'payment_status'],
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
          ],
        },
      ],
    });
  }

  async getPayments(limit: number, offset: number) {
    return await this.accountRepository.findAndCountAll<Payment>({
      limit: limit,
      offset: offset,
      include: [
        {
          model: Booking,
          attributes: ['customer_id', 'payment_status', 'room_id'],
          include: [
            {
              model: Customer,
              attributes: ['name'],
            },
            {
              model: Room,
              attributes: ['title'],
            },
          ],
        },
      ],
    });
  }

  async getPaymentsByDate(
    limit: number,
    offset: number,
    start: Date,
    end: Date,
  ) {
    return this.accountRepository.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [['createdAt', 'DESC']],
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date(start).setHours(0, 0, 0)),
          [Op.lt]: new Date(new Date(end).setHours(23, 59, 59)),
        },
      },
    });
  }
}
