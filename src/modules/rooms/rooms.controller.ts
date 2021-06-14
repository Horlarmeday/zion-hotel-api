import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('rooms')
@UseGuards(JwtAuthGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    const room = await this.roomsService.createRoom(createRoomDto);
    return { message: 'Data saved', result: room };
  }

  @Get()
  async findRooms() {
    const rooms = await this.roomsService.findRooms();
    return { message: 'Data retrieved', result: rooms };
  }

  @Patch()
  async update(@Body() updateRoomDto: UpdateRoomDto) {
    const { id } = updateRoomDto;
    const room = await this.roomsService.updateRoom(id, updateRoomDto);
    return { message: 'Data updated', result: room };
  }
}
