import { Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CUSTOMER_REPOSITORY } from '../../core/constants';
import { Customer } from './entities/customer.entity';
import { GeneralHelpers } from '../../common/helpers/general.helpers';
import { QueryDto } from '../../core/pipes/query-dto';
import { Op } from 'sequelize';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CUSTOMER_REPOSITORY) private customerRepository: typeof Customer,
    private readonly generalHelper: GeneralHelpers,
  ) {}
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerRepository.create<Customer>(createCustomerDto);
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
    let customers;
    const { currentPage, pageLimit, search } = queryDto;

    const { limit, offset } = this.generalHelper.getPagination(
      +currentPage,
      +pageLimit,
    );

    if (search) {
      customers = await this.searchCustomers(search, limit, offset);
    } else {
      customers = await this.getCustomers(limit, offset);
    }

    return this.generalHelper.paginate(customers, currentPage, limit);
  }

  async searchCustomers(search: string, limit: number, offset: number) {
    return await this.customerRepository.findAndCountAll<Customer>({
      limit: limit,
      offset: offset,
      where: {
        name: {
          [Op.iLike]: `%${search}%`,
        },
      },
    });
  }

  async getCustomers(limit: number, offset: number) {
    return await this.customerRepository.findAndCountAll<Customer>({
      limit: limit,
      offset: offset,
    });
  }

  async findOneById(id: string) {
    return this.customerRepository.findOne({ where: { id } });
  }

  async findOneByPhone(phone: string) {
    return this.customerRepository.findOne({ where: { phone } });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    return this.customerRepository.update(updateCustomerDto, { where: { id } });
  }
}
