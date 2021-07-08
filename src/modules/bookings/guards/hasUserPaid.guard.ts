import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BookingsService } from '../bookings.service';
import { COMPLETE } from '../../../core/constants';

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
    const booking = await this.bookingsService.findOneById(request.params.id);
    if (booking.payment_status !== COMPLETE) {
      throw new ForbiddenException(
        'Sorry, customer has not completed payment.',
      );
    }
    return true;
  }
}
