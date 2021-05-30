import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { roomsProviders } from './rooms.providers';
import { categoriesProviders } from './rooms-categories.providers';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, ...roomsProviders, ...categoriesProviders],
})
export class RoomsModule {}