import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { customersProviders } from './customers.providers';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService, ...customersProviders],
  exports: [CustomersService],
})
export class CustomersModule {}
