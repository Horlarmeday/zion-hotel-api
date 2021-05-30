import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AddOnsService } from './addons.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('addons')
@UseGuards(JwtAuthGuard)
export class AddOnsController {
  constructor(private readonly addonsService: AddOnsService) {}

  @Post()
  async createAddon(@Body() createAddonDto: CreateAddonDto) {
    return this.addonsService.create(createAddonDto);
  }

  @Get()
  async findAll() {
    return this.addonsService.findAddOns();
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddonDto: UpdateAddonDto,
  ) {
    return this.addonsService.update(id, updateAddonDto);
  }

  @Delete(':id')
  async deleteAddon(@Param('id') id: string) {
    return this.addonsService.remove(id);
  }
}
