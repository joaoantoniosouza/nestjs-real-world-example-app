import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsAlphanumeric,
  IsUrl,
  MinLength,
  IsOptional,
} from 'class-validator';
import { UserData } from '../user.interface';

export class UserCreateDTO implements UserData {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'A senha deve conter no mínimo 6 caracteres.' })
  readonly password: string;

  @IsString()
  readonly bio?: string;

  @IsUrl()
  @IsOptional()
  readonly image?: string;
}
