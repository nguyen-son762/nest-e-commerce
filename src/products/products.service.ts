import { Product } from '@/entities';
import { errException } from '@/helpers/err-exception';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, Equal } from 'typeorm';
import { limitProduct } from './constants/product.constant';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  productListResponseDef,
  productResponseDef,
  queryGetProductDef,
} from './types/product.type';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(
    query: queryGetProductDef,
  ): Promise<HttpException | productListResponseDef> {
    const {
      page = 1,
      limit = limitProduct,
      keyword,
      type,
      orderByName,
      orderByValue,
    } = query;

    let searchQuery = {};
    let orderByQuery = {};
    if (keyword) {
      searchQuery = {
        ...searchQuery,
        name: Like('%' + keyword + '%'),
      };
    }
    if (type) {
      searchQuery = {
        ...searchQuery,
        category: Equal(type),
      };
    }
    if (orderByValue && (orderByName === 'name' || orderByName === 'price')) {
      orderByQuery[orderByName] = orderByValue.toLocaleUpperCase();
    } else {
      orderByQuery = {
        product_id: 'ASC',
      };
    }
    const products = await this.productRepository.find({
      relations: [
        'category',
        'details',
        'details.color',
        'details.size',
        'details.images',
      ],
      order: orderByQuery,
      where: searchQuery,
      skip: (page - 1) * limit,
      take: limit,
    });
    const total = await this.productRepository.count();

    return {
      data: products,
      page,
      totalPage: Math.ceil(total / limit),
    };
  }

  async findOne(id: number): Promise<HttpException | productResponseDef> {
    try {
      const product = await this.productRepository.findOne(id, {
        relations: [
          'category',
          'details',
          'details.color',
          'details.size',
          'details.images',
        ],
      });
      if (!product) {
        throw errException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Can not find product',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        data: product,
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

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
