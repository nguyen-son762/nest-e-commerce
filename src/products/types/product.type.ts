import { Product } from './../../entities/product.entity';

export type productListResponseDef = {
  data: Product[];
  page: number;
  totalPage: number;
};

export type productResponseDef = {
  data: Product;
};

export type queryGetProductDef = {
  page?: number | undefined;
  limit?: number | undefined;
  keyword?: string | undefined;
  type?: number | undefined;
  min_price?: number | undefined;
  max_price?: number | undefined;
  orderByName?: string;
  orderByValue?: string;
};
