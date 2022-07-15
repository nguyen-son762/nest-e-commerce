import { Controller } from '@nestjs/common';
import { SizesService } from './sizes.service';

@Controller('sizes')
export class SizesController {
  constructor(private readonly sizesService: SizesService) {}
}
