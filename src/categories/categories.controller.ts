import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { categoryResponseDef } from './types/category.type';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async findAll(): Promise<HttpException | categoryResponseDef> {
    return await this.categoriesService.findAll();
  }
}
