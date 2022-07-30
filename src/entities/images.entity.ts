import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductDetail } from './productDetail.entity';

enum enumStatusImage {
  THUMNAIL = 0,
  NORMAL = 1,
}

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  image_id: number;

  @Column()
  url: string;

  @Column()
  status: enumStatusImage.THUMNAIL | enumStatusImage.NORMAL;

  @OneToOne(
    () => ProductDetail,
    (productDetail) => productDetail.product_detail_id,
  )
  @JoinColumn()
  productDetail: ProductDetail;
}
