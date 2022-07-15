import { IsString, MinLength, MaxLength, IsEmail } from 'class-validator';
export class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
