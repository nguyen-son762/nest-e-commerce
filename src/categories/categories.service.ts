import { Category } from '@/entities/category.entity';
import { errException } from '@/helpers/err-exception';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { categoryResponseDef } from './types/category.type';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  async findAll(): Promise<HttpException | categoryResponseDef> {
    try {
      const categories = await this.categoriesRepository.find();
      return {
        data: categories,
      };
    } catch (error) {
      throw errException(
        {
          status: HttpStatus.BAD_REQUEST,
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
