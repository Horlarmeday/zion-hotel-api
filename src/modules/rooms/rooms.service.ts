import { Inject, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CATEGORY_REPOSITORY, ROOM_REPOSITORY } from '../../core/constants';
import { Room } from './entities/room.entity';
import { Category } from './entities/category.entity';
import {CreateCategoryDto} from "./dto/create-category.dto";
import {UpdateCategoryDto} from "./dto/update-category.dto";

@Injectable()
export class RoomsService {
  constructor(
    @Inject(ROOM_REPOSITORY) private roomRepository: typeof Room,
    @Inject(CATEGORY_REPOSITORY) private categoryRepository: typeof Category,
  ) {}
  async createRoom(createRoomDto: CreateRoomDto): Promise<Room> {
    return this.roomRepository.create<Room>(createRoomDto);
  }

  async findRooms() {
    return this.roomRepository.findAll<Room>();
  }

  async updateRoom(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomRepository.update(updateRoomDto, { where: { id } });
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryRepository.create<Category>(createCategoryDto);
  }

  async findCategories() {
    return this.categoryRepository.findAll<Category>();
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update<Category>(updateCategoryDto, {
      where: { id },
    });
  }
}
