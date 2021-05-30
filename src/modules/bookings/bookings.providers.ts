import { Booking } from './entities/booking.entity';
import { BOOKING_REPOSITORY } from '../../core/constants';

export const bookingsProviders = [
  {
    provide: BOOKING_REPOSITORY,
    useValue: Booking,
  },
];
