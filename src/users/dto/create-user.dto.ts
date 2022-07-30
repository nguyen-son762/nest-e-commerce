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
  @Matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  )
  phonenumber: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  password: string;
}
