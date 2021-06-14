import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ROOM_REPOSITORY } from '../../core/constants';
import { Room } from './entities/room.entity';
import { Category } from '../categories/entities/category.entity';

@Injectable()
export class RoomsService {
  constructor(@Inject(ROOM_REPOSITORY) private roomRepository: typeof Room) {}

  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    const room = await this.roomRepository.create<Room>(createRoomDto);
    return await this.findRoomById(room.id);
  }

  async findRooms() {
    return this.roomRepository.findAll<Room>({
      include: [{ model: Category, attributes: ['name'] }],
    });
  }

  async updateRoom(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomRepository.update(updateRoomDto, { where: { id } });
  }

  async findRoomById(id: string) {
    return this.roomRepository.findOne<Room>({
      where: {
        id,
      },
      include: [{ model: Category, attributes: ['name'] }],
    });
  }
}
