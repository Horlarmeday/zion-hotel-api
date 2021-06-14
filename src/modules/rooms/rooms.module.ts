import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { roomsProviders } from './rooms.providers';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, ...roomsProviders],
})
export class RoomsModule {}
