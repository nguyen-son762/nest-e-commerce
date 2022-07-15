import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
  IsNumber,
  Min,
} from 'class-validator';
export class CreateOrderDto {
  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  @MinLength(2)
  @MaxLength(100)
  address: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
  phonenumber: string;

  @IsNumber()
  user_id: string;

  @IsNumber()
  product_id: string;

  @IsNumber()
  product_detail_id: number;
}
