import { Customer } from './entities/customer.entity';
import { CUSTOMER_REPOSITORY } from '../../core/constants';

export const customersProviders = [
  {
    provide: CUSTOMER_REPOSITORY,
    useValue: Customer,
  },
];
