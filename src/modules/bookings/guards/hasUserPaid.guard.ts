import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BookingsService } from '../bookings.service';

@Injectable()
export class HasUserPaid implements CanActivate {
  constructor(private readonly bookingsService: BookingsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const booking = await this.bookingsService.findOne(request.params.id);
    if (booking.payment_status !== 'Complete') {
      throw new ForbiddenException(
        'Sorry, you cannot check in an unpaid customer.',
      );
    }
    return true;
  }
}
