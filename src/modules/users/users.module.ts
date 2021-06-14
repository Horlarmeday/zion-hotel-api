import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProviders } from './users.providers';
import { DatabaseModule } from '../../core/database/database.module';
import { GeneralHelpers } from '../../common/helpers/general.helpers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders, GeneralHelpers],
  exports: [UsersService],
})
export class UsersModule {}
