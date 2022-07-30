import { LoginUserDto } from './dto/login-user.dto';
import { User } from '@/entities/index';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { errException } from '@/helpers/err-exception';
import { userResponseDef } from './types/user.type';
import { AuthService } from '@/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private authService: AuthService,
  ) {}

  public async create(user: CreateUserDto) {
    const { first_name, last_name, email, phonenumber, password } = user;
    try {
      const userInDb = await this.usersRepository.findOne({
        email,
      });
      if (userInDb) {
        throw errException(
          {
            status: HttpStatus.CONFLICT,
            error: 'User is existed',
          },
          HttpStatus.CONFLICT,
        );
      }
      const newUser = this.usersRepository.create({
        first_name,
        last_name,
        email,
        password,
        phonenumber,
      });
      return await this.usersRepository.save(newUser);
    } catch (error) {
      throw errException(
        {
          status: HttpStatus.BAD_REQUEST,
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(user: LoginUserDto): Promise<HttpException | userResponseDef> {
    const { email, password } = user;
    try {
      const userInDb = await this.usersRepository.findOne({
        email,
      });
      if (userInDb && userInDb.password === password) {
        const { user_id, first_name, last_name, email, phonenumber } = userInDb;
        const accessToken = await this.authService.generateJwt(userInDb);
        return {
          user_id,
          first_name,
          last_name,
          email,
          phonenumber,
          accessToken,
        };
      }
      if (userInDb && userInDb.password !== password) {
        throw errException(
          {
            status: HttpStatus.CONFLICT,
            error: 'Email is already in use',
          },
          HttpStatus.CONFLICT,
        );
      }
      throw errException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Can not find user',
        },
        HttpStatus.NOT_FOUND,
      );
    } catch (error) {
      throw errException(
        {
          status: HttpStatus.BAD_REQUEST,
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
