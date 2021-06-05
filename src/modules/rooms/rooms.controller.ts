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
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    const room = await this.roomsService.updateRoom(id, updateRoomDto);
    return { message: 'Data updated', result: room };
  }

  @Post('/category')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.roomsService.createCategory(createCategoryDto);
    return { message: 'Category saved', result: category };
  }

  @Get('/category')
  async findCategories() {
    const categories = await this.roomsService.findCategories();
    return { message: 'Data retrieved', result: categories };
  }

  @Patch('/category/:id')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.roomsService.updateCategory(
      id,
      updateCategoryDto,
    );
    return { message: 'Data updated', result: category };
  }
}
