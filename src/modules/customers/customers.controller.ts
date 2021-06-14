import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards, Query,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { IsCustomerExistGuard } from './guards/isCustomerExist.guard';
import {QueryDto} from "../../core/pipes/query-dto";

@Controller('customers')
@UseGuards(JwtAuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @UseGuards(IsCustomerExistGuard)
  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    const customer = await this.customersService.create(createCustomerDto);
    return { message: 'Customer created', result: customer };
  }

  @Get()
  async findAll(@Query() queryDto: QueryDto) {
    const customers = await this.customersService.findAll(queryDto);
    return { message: 'Data retrieved', result: customers };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const customer = await this.customersService.findOneById(id);
    return { message: 'Data retrieved', result: customer };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    const customer = await this.customersService.update(id, updateCustomerDto);
    return { message: 'Data updated', result: customer };
  }
}
