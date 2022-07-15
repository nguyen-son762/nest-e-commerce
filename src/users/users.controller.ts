import { LoginUserDto } from './dto/login-user.dto';
import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@/entities';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  findOne(@Body() loginUserDto: LoginUserDto): Promise<HttpException | User> {
    return this.usersService.findOne(loginUserDto);
  }
}
