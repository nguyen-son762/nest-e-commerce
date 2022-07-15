import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  first_name: string;

  @IsString()
  @MinLength(2)
  @MaxLength(10)
  last_name: string;

  @IsEmail()
  email: string;

  @IsString()
  @Matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/)
  phonenumber: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
