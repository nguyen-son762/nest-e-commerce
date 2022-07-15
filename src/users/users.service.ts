import { LoginUserDto } from './dto/login-user.dto';
import { User } from '@/entities/index';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { errException } from '@/helpers/err-exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async create(user: CreateUserDto) {
    const { first_name, last_name, email, phonenumber, password } = user;
    try {
      const userInDb = await this.usersRepository.findOne({
        email,
      });
      if (userInDb) {
        return errException(
          {
            status: HttpStatus.CONFLICT,
            msg: 'User is existed',
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
      return this.usersRepository.save(newUser);
    } catch (err) {
      throw errException(
        {
          status: HttpStatus.BAD_REQUEST,
          msg: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findOne(user: LoginUserDto) {
    const { email, password } = user;
    try {
      const userInDb = await this.usersRepository.findOne({
        email,
      });
      if (userInDb && userInDb.password === password) {
        return userInDb;
      }
      return errException(
        {
          status: HttpStatus.NOT_FOUND,
          msg: 'Can not find user',
        },
        HttpStatus.NOT_FOUND,
      );
    } catch (err) {
      throw errException(
        {
          status: HttpStatus.BAD_REQUEST,
          msg: err.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
