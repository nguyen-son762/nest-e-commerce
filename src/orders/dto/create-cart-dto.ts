import { IsNumber, Min } from 'class-validator';
export class CreateCartDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsNumber()
  user_id: number;

  @IsNumber()
  product_detail_id: number;
}
