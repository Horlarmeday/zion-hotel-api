import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { paymentsProviders } from './accounts.providers';
import { GeneralHelpers } from '../../common/helpers/general.helpers';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, ...paymentsProviders, GeneralHelpers],
  exports: [AccountsService],
})
export class AccountsModule {}
