import { CategoryDef } from '@/categories/types/category.type';
import { ProductDetailDef } from '@/product-details/types/product-details';

export type productResponseDef = {
  page: number;
  data: ProductDef[];
};

export type queryGetProductDef = {
  page?: number;
  limit?: number;
  keyword?: string;
  type?: number;
  min_price?: number;
};

export type ProductDef = {
  product_id: number;
  name: string;
  description: string;
  price: number;
  promotion?: number;
  category: CategoryDef;
  details: ProductDetailDef[];
};
