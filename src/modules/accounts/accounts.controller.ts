import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { QueryDto } from '../../core/pipes/query-dto';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post(':id')
  async createPayment(
    @Body() createAccountDto: CreateAccountDto,
    @Param('id') id: string,
  ) {
    const payment = await this.accountsService.createPayment(
      createAccountDto,
      id,
    );
    return { message: 'Payment saved', result: payment };
  }

  @Get()
  async findAll(@Query() queryDto: QueryDto) {
    const payments = await this.accountsService.findPayments(queryDto);
    return { message: 'Data retrieved', result: payments };
  }
}
