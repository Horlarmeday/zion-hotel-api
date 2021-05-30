import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CUSTOMER_REPOSITORY } from '../../core/constants';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) private customerRepository: typeof Customer,
  ) {}
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerRepository.create<Customer>(createCustomerDto);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.findAll<Customer>();
  }

  async findOne(id: string) {
    return this.customerRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepository.update(updateCustomerDto, { where: { id } });
  }
}
