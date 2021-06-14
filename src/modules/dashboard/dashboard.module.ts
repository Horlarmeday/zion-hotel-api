import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { CustomersModule } from '../customers/customers.module';
import { AccountsModule } from '../accounts/accounts.module';
import { BookingsModule } from '../bookings/bookings.module';
import { paymentsProviders } from '../accounts/accounts.providers';
import { customersProviders } from '../customers/customers.providers';
import { bookingsProviders } from '../bookings/bookings.providers';

@Module({
  imports: [CustomersModule, AccountsModule, BookingsModule],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    ...paymentsProviders,
    ...customersProviders,
    ...bookingsProviders,
  ],
})
export class DashboardModule {}
