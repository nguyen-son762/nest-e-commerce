import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductDetail } from './productDetail.entity';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  product_id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  promotion: number;

  @ManyToOne(() => Category, (category) => category.category_id)
  @JoinColumn()
  category: Category;

  @OneToMany(() => ProductDetail, (productColor) => productColor.product)
  @JoinColumn()
  details: ProductDetail[];
}
