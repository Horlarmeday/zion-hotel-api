import { Inject, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ACCOUNTS_REPOSITORY } from '../../core/constants';
import { Payment } from './entities/payment.entity';

@Injectable()
export class AccountsService {
  constructor(
    @Inject(ACCOUNTS_REPOSITORY) private accountRepository: typeof Payment,
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

  async findPayments(): Promise<Payment[]> {
    return this.accountRepository.findAll<Payment>();
  }
}
