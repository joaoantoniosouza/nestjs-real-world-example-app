import { Exclude } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { UserData } from '../user.interface';

export class UserUpdateDTO implements UserData {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly bio?: string;

  @IsString()
  readonly image?: string;

  @Exclude()
  username: string;

  @Exclude()
  password: string;
}
