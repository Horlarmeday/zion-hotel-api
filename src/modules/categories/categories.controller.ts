import {Controller, Get, Post, Body, Patch, UseGuards, HttpCode} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoriesService.createCategory(
      createCategoryDto,
    );
    return { message: 'Category saved', result: category };
  }

  @Get()
  async findCategories() {
    const categories = await this.categoriesService.findCategories();
    return { message: 'Data retrieved', result: categories };
  }

  @Patch()
  @HttpCode(204)
  async updateCategory(@Body() updateCategoryDto: UpdateCategoryDto) {
    const { id } = updateCategoryDto;
    const category = await this.categoriesService.updateCategory(
      id,
      updateCategoryDto,
    );
    return { message: 'Data updated', result: category };
  }
}
