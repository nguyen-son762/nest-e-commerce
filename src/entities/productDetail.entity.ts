import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from './color.entity';
import { Product } from './product.entity';
import { Size } from './size.entity';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn()
  product_detail_id: number;

  @OneToOne(() => Product, (product) => product.product_id)
  @JoinColumn()
  product: Product;

  @OneToOne(() => Size, (size) => size.size_id)
  @JoinColumn()
  size: Size;

  @OneToOne(() => Color, (color) => color.color_id)
  @JoinColumn()
  color: Color;

  @Column()
  amount: number;
}
