import { ProductDetail } from './../entities/productDetail.entity';
import { Order, User } from '@/entities';
import { errException } from '@/helpers/err-exception';
import { enumOrderStatus } from '@/types/orderStatus';
import { HttpStatus, Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { messageRes } from '@/common/message';
import { CheckoutOrderDto } from './dto/checkout-order.dto';
import { cartResponseDef } from './types/order.types';
import { CreateCartDto } from './dto/create-cart-dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ProductDetail)
    private productDetailsRepository: Repository<ProductDetail>,
  ) {}
  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<HttpException | boolean> {
    try {
      const {
        amount,
        address,
        phonenumber,
        user_id,
        product_detail_id,
        email,
      } = createOrderDto;

      const user = await this.usersRepository.findOne(user_id);
      if (!user) {
        throw errException(
          {
            status: HttpStatus.NOT_FOUND,
            error: messageRes.USER_INVALID,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const productDetail = await this.productDetailsRepository.findOne(
        product_detail_id,
      );
      if (!productDetail) {
        throw errException(
          {
            status: HttpStatus.NOT_FOUND,
            error: messageRes.PRODUCT_DETAIL_INVALID,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const order = this.ordersRepository.create({
        amount,
        email,
        address,
        phonenumber,
        user,
        status: enumOrderStatus.ORDERED,
        productDetail,
      });
      await this.ordersRepository.save(order);

      return true;
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

  async checkout(
    checkoutOrderDto: CheckoutOrderDto[],
  ): Promise<HttpException | boolean> {
    try {
      for await (const order of checkoutOrderDto) {
        const {
          order_id,
          amount,
          address,
          phonenumber,
          product_detail_id,
          email,
        } = order;

        const orderDetail = await this.ordersRepository.findOne(order_id);
        if (!orderDetail) {
          return errException(
            {
              status: HttpStatus.NOT_FOUND,
              error: messageRes.ORDER_NOT_FOUND,
            },
            HttpStatus.NOT_FOUND,
          );
        }
        if (orderDetail.status === enumOrderStatus.ORDERED) {
          return errException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: messageRes.ORDER_IS_PALACED,
            },
            HttpStatus.BAD_REQUEST,
          );
        }

        const productDetail = await this.productDetailsRepository.findOne(
          product_detail_id,
        );
        if (!productDetail) {
          return errException(
            {
              status: HttpStatus.NOT_FOUND,
              error: messageRes.PRODUCT_DETAIL_INVALID,
            },
            HttpStatus.NOT_FOUND,
          );
        }
        if (productDetail.amount < amount) {
          return errException(
            {
              status: HttpStatus.FAILED_DEPENDENCY,
              error: messageRes.AMOUNT_NOT_ENOUGH,
            },
            HttpStatus.FAILED_DEPENDENCY,
          );
        }

        await this.ordersRepository.save({
          ...order,
          amount,
          address,
          phonenumber,
          email,
          status: enumOrderStatus.ORDERED,
        });
        await this.productDetailsRepository.save({
          ...productDetail,
          amount: productDetail.amount - amount,
        });
      }
      return true;
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

  async getCart(req: any): Promise<cartResponseDef | null> {
    try {
      const id = req.user.user_id;
      const cart = await this.ordersRepository.find({
        relations: [
          'productDetail',
          'productDetail.product',
          'productDetail.size',
          'productDetail.color',
        ],
        where: {
          user: {
            user_id: id,
          },
        },
      });
      return {
        cart,
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

  async addProductToCart(createCartDto: CreateCartDto) {
    try {
      const { user_id, product_detail_id, amount } = createCartDto;
      const user = await this.usersRepository.findOne(user_id);
      if (!user) {
        throw errException(
          {
            status: HttpStatus.NOT_FOUND,
            error: messageRes.USER_INVALID,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const productDetail = await this.productDetailsRepository.findOne(
        product_detail_id,
      );
      if (!productDetail) {
        throw errException(
          {
            status: HttpStatus.NOT_FOUND,
            error: messageRes.PRODUCT_DETAIL_INVALID,
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const order = this.ordersRepository.create({
        amount,
        user,
        status: enumOrderStatus.ORDERING,
        productDetail,
      });
      await this.ordersRepository.save(order);
      return true;
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
