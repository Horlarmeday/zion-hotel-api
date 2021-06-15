import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { bookingsProviders } from './bookings.providers';
import { GeneralHelpers } from '../../common/helpers/general.helpers';
import { AccountsModule } from '../accounts/accounts.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [AccountsModule, RoomsModule],
  controllers: [BookingsController],
  providers: [BookingsService, ...bookingsProviders, GeneralHelpers],
  exports: [BookingsService],
})
export class BookingsModule {}
