import {
  Body,
  Controller,
  Post,
  HttpException,
  Get,
  Request,
} from '@nestjs/common';
import { CheckoutOrderDto } from './dto/checkout-order.dto';
import { CreateCartDto } from './dto/create-cart-dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { cartResponseDef } from './types/order.types';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  getAll() {
    return 'name';
  }
  @Get('/cart')
  getCartByUser(@Request() req): Promise<cartResponseDef | null> {
    return this.ordersService.getCart(req);
  }

  @Post('/cart')
  createCart(@Body() createCartDto: CreateCartDto): Promise<boolean | null> {
    return this.ordersService.addProductToCart(createCartDto);
  }

  @Post('/create')
  create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<HttpException | boolean> {
    return this.ordersService.create(createOrderDto);
  }

  @Post('/checkout')
  checkout(
    @Body() checkoutOrderDto: CheckoutOrderDto[],
  ): Promise<HttpException | boolean> {
    return this.ordersService.checkout(checkoutOrderDto);
  }
}
