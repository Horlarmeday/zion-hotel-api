import { Payment } from './entities/payment.entity';
import { ACCOUNTS_REPOSITORY } from '../../core/constants';

export const paymentsProviders = [
  {
    provide: ACCOUNTS_REPOSITORY,
    useValue: Payment,
  },
];
