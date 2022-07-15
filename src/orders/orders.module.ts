import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order, User, ProductDetail } from '@/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, ProductDetail])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
