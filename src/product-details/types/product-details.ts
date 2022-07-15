import { ColorDef } from '@/colors/types/color.type';
import { SizeDef } from '@/sizes/types/size.type';

export type ProductDetailDef = {
  product_detail_id: number;
  amount: number;
  size: SizeDef;
  color: ColorDef;
};
