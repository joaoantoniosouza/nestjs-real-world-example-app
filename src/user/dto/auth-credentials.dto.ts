import { PickType } from '@nestjs/mapped-types';
import { UserCreateDTO } from './user-create.dto';

export class AuthCredentialsDTO extends PickType(UserCreateDTO, [
  'email',
  'password',
] as const) {}
