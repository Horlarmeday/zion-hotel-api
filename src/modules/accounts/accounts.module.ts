import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { paymentsProviders } from './accounts.providers';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService, ...paymentsProviders],
})
export class AccountsModule {}
