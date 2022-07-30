import { orderStatus } from '@/types/orderStatus';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductDetail } from './productDetail.entity';
import { User } from './user.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column()
  status: orderStatus;

  @Column()
  amount: number;

  @Column({
    nullable: true,
  })
  email: string;
  @Column({
    nullable: true,
  })
  address: string;
  @Column({
    nullable: true,
  })
  phonenumber: string;

  @ManyToOne(() => User, (user) => user.user_id, { nullable: true })
  @JoinColumn()
  user: User;

  @ManyToOne(() => ProductDetail, (product) => product.product_detail_id)
  @JoinColumn()
  productDetail: ProductDetail;

  @Column({ nullable: true, default: () => 'NOW()' })
  created_at: Date;

  @Column({ nullable: true, default: () => 'NOW()' })
  updated_at: Date;
}
