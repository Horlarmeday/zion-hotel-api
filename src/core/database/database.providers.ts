import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import { User } from '../../modules/users/entities/user.entity';
import { Customer } from '../../modules/customers/entities/customer.entity';
import { Room } from '../../modules/rooms/entities/room.entity';
import { Addon } from '../../modules/addons/entities/addon.entity';
import { Payment } from '../../modules/accounts/entities/payment.entity';
import { Booking } from '../../modules/bookings/entities/booking.entity';
import { Category } from '../../modules/categories/entities/category.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);
      sequelize.addModels([
        User,
        Customer,
        Category,
        Addon,
        Room,
        Payment,
        Booking,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
