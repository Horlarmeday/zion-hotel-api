import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BookingsService } from '../bookings.service';
import { PENDING } from '../../../core/constants';

@Injectable()
export class HasUserCheckedIn implements CanActivate {
  constructor(private readonly bookingsService: BookingsService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const booking = await this.bookingsService.findOneById(request.params.id);
    if (booking.status === PENDING) {
      throw new BadRequestException(
        'Sorry, you cannot checkout a customer who has not been checked in',
      );
    }
    return true;
  }
}
