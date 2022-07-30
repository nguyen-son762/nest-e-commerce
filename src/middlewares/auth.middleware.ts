import { AuthService } from '@/auth/auth.service';
import { userResponseDef } from '@/users/types/user.type';
import { UsersService } from '@/users/users.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export interface RequestModel extends Request {
  user: userResponseDef | HttpException;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}

  async use(req: RequestModel, res: Response, next: NextFunction) {
    try {
      const tokenArray: string[] = req.headers['authorization']?.split(' ');
      const decodedToken = await this.authService.verifyJwt(tokenArray[1]);
      // make sure that the user is not deleted, or that props or rights changed compared to the time when the jwt was issued
      const user = decodedToken?.user;
      if (user) {
        // add the user to our req object, so that we can access it later when we need it
        // if it would be here, we would like overwrite
        req.user = user;
        next();
      } else {
        throw new HttpException(
          {
            message: 'Unauthorized',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (err) {
      throw new HttpException(
        { message: 'Unauthorized' },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
