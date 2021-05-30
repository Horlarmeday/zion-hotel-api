import { Module } from '@nestjs/common';
import { AddOnsService } from './addons.service';
import { AddOnsController } from './addons.controller';
import { addonsProviders } from './addons.providers';

@Module({
  controllers: [AddOnsController],
  providers: [AddOnsService, ...addonsProviders],
})
export class AddonsModule {}
