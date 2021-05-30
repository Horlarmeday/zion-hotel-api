import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { bookingsProviders } from './bookings.providers';
import { GeneralHelpers } from '../../common/helpers/general.helpers';

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, ...bookingsProviders, GeneralHelpers],
})
export class BookingsModule {}
