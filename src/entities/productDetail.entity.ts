import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Color } from './color.entity';
import { Image } from './images.entity';
import { Product } from './product.entity';
import { Size } from './size.entity';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn()
  product_detail_id: number;

  @ManyToOne(() => Product, (product) => product.product_id)
  @JoinColumn()
  product: Product;

  @ManyToOne(() => Size, (size) => size.size_id)
  @JoinColumn()
  size: Size;

  @ManyToOne(() => Color, (color) => color.color_id)
  @JoinColumn()
  color: Color;

  @Column()
  amount: number;

  @OneToMany(() => Image, (image) => image.productDetail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  images: Image;
}
