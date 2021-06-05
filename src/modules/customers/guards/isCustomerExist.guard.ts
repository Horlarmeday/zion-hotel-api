import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CustomersService } from '../customers.service';

@Injectable()
export class IsCustomerExistGuard implements CanActivate {
  constructor(private readonly customersService: CustomersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const customer = await this.customersService.findOneByPhone(
      request.body.phone,
    );
    if (customer) {
      throw new BadRequestException('Customer already exists');
    }
    return true;
  }
}
