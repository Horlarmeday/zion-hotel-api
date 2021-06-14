import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AddOnsService } from './addons.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { QueryDto } from '../../core/pipes/query-dto';

@Controller('addons')
@UseGuards(JwtAuthGuard)
export class AddOnsController {
  constructor(private readonly addonsService: AddOnsService) {}

  @Post()
  async createAddon(@Body() createAddonDto: CreateAddonDto) {
    const addon = await this.addonsService.create(createAddonDto);
    return { message: 'Addon saved', result: addon };
  }

  @Get()
  async findAll(@Query() queryDto: QueryDto) {
    const addons = await this.addonsService.findAddOns(queryDto);
    return { message: 'Data retrieved', result: addons };
  }

  @Patch()
  async update(@Body() updateAddonDto: UpdateAddonDto) {
    const { id } = updateAddonDto;
    const addon = await this.addonsService.update(id, updateAddonDto);
    return { message: 'Data updated', result: addon };
  }

  @Delete(':id')
  async deleteAddon(@Param('id') id: string) {
    const addon = await this.addonsService.remove(id);
    return { message: 'Data deleted', result: addon };
  }
}
