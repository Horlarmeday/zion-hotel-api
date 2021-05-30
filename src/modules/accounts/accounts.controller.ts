import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post(':id')
  async create(
    @Body() createAccountDto: CreateAccountDto,
    @Param('id') id: string,
  ) {
    return this.accountsService.createPayment(createAccountDto, id);
  }

  @Get()
  async findAll() {
    return this.accountsService.findPayments();
  }
}
