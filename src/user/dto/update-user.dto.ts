import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  name: string;
}

export class UpdatePasswordUserDto {
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsNotEmpty()
  @MinLength(4)
  conf_password: string;
}
