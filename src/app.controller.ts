import { CACHE_MANAGER, Controller, Get, Inject, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get()
  async getHello(@Req() req): Promise<string> {
    return req.csrfToken();
  }
}
