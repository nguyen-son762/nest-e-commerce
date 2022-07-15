import { Product } from '@/entities';
import { errException } from '@/helpers/err-exception';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, MoreThanOrEqual, Equal } from 'typeorm';
import { limitProduct } from './constants/product.constant';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { queryGetProductDef } from './types/product.type';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(query: queryGetProductDef) {
    const {
      page = 1,
      limit = limitProduct,
      keyword = '',
      type = '',
      min_price = 0,
    } = query;
    let searchQuery = {};
    if (keyword) {
      searchQuery = {
        ...searchQuery,
        name: Like('%' + keyword + '%'),
      };
    }
    if (min_price) {
      searchQuery = {
        ...searchQuery,
        price: MoreThanOrEqual(min_price),
      };
    }
    if (type) {
      searchQuery = {
        ...searchQuery,
        category: Equal(type),
      };
    }
    const products = await this.productRepository.find({
      relations: ['category', 'details', 'details.color', 'details.size'],
      where: searchQuery,
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data: products,
      page,
    };
  }

  findOne(id: number) {
    try {
    } catch (err) {
      throw errException(
        {
          status: HttpStatus.BAD_REQUEST,
          msg: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
