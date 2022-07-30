import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  productListResponseDef,
  productResponseDef,
  queryGetProductDef,
} from './types/product.type';
import { Request } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Req() request: Request,
  ): Promise<HttpException | productListResponseDef> {
    const {
      keyword,
      type,
      min_price,
      page = 1,
      order_by_name,
      order_by_value,
    } = request.query;
    return this.productsService.findAll({
      keyword,
      type: Number(type) || undefined,
      min_price: Number(min_price) || 0,
      page: Number(page) || 1,
      orderByName: order_by_name,
      orderByValue: order_by_value,
    } as queryGetProductDef);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ): Promise<HttpException | productResponseDef> {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
