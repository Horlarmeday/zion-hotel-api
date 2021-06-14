import { Module } from '@nestjs/common';
import { AddOnsService } from './addons.service';
import { AddOnsController } from './addons.controller';
import { addonsProviders } from './addons.providers';
import { GeneralHelpers } from '../../common/helpers/general.helpers';

@Module({
  controllers: [AddOnsController],
  providers: [AddOnsService, ...addonsProviders, GeneralHelpers],
})
export class AddonsModule {}
