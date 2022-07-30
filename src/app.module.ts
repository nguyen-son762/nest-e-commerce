import { UsersModule } from './users/users.module';
import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { User } from './entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { SizesModule } from './sizes/sizes.module';
import { ColorsModule } from './colors/colors.module';
import { ProductDetailsModule } from './product-details/product-details.module';
import { OrdersModule } from './orders/orders.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import * as redisStore from 'cache-manager-redis-store';
@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    TypeOrmModule.forFeature([User]),
    CategoriesModule,
    ProductsModule,
    SizesModule,
    ColorsModule,
    ProductDetailsModule,
    OrdersModule,
    AuthModule,
    UsersModule,
    CacheModule.register({
      ttl: 60,
      max: 30 * 24 * 60 * 60,
      isGlobal: true,
      store: redisStore,
      socket: {
        host: 'localhost',
        port: 6379,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/orders/*',
      method: RequestMethod.ALL,
    });
  }
}
