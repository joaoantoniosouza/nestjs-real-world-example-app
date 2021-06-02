import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { UserData } from '../user.interface';

export class AuthCredentialsDTO
  implements Pick<UserData, 'email' | 'password'>
{
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
