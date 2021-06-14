import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { customersProviders } from './customers.providers';
import { GeneralHelpers } from '../../common/helpers/general.helpers';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, ...customersProviders, GeneralHelpers],
  exports: [CustomersService],
})
export class CustomersModule {}
