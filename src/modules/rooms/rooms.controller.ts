import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post()
  async createRoom(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.createRoom(createRoomDto);
  }

  @Get()
  async findRooms() {
    return this.roomsService.findRooms();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.updateRoom(id, updateRoomDto);
  }

  @Post('/category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.roomsService.createCategory(createCategoryDto);
  }

  @Get('/category')
  async findCategories() {
    return this.roomsService.findCategories();
  }

  @Patch('/category/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.roomsService.updateCategory(id, updateCategoryDto);
  }
}
