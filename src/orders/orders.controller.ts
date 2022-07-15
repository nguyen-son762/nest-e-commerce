import { Body, Controller, Post, HttpException } from '@nestjs/common';
import { CheckoutOrderDto } from './dto/checkout-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
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
