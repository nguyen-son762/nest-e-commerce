import { Controller } from '@nestjs/common';
import { ProductDetailsService } from './product-details.service';

@Controller('product-details')
export class ProductDetailsController {
  constructor(private readonly productDetailsService: ProductDetailsService) {}
}
