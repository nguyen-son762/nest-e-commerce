import { orderStatus } from '@/types/orderStatus';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
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
  address: string;
  @Column({
    nullable: true,
  })
  phonenumber: string;
  @ManyToOne(() => User, (user) => user.user_id)
  user: User;
  @ManyToOne(() => Product, (product) => product.product_id, { primary: true })
  product: Product;
  @Column({ nullable: true, default: () => 'NOW()' })
  created_at: Date;
  @Column({ nullable: true, default: () => 'NOW()' })
  updated_at: Date;
}
