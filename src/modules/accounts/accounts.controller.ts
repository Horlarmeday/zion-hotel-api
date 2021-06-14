import { Controller, Get, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { QueryDto } from '../../core/pipes/query-dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  async findAll(@Query() queryDto: QueryDto) {
    const payments = await this.accountsService.findPayments(queryDto);
    return { message: 'Data retrieved', result: payments };
  }
}
