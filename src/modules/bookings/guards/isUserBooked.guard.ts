import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BookingsService } from '../bookings.service';

@Injectable()
export class IsUserBooked implements CanActivate {
  constructor(private readonly bookingsService: BookingsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const booking = await this.bookingsService.findOneBooked(
      request.body.customer_id,
    );
    if (booking) {
      throw new BadRequestException(
        'Sorry, you cannot book a customer who has already been booked',
      );
    }
    return true;
  }
}
