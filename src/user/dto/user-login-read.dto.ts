import { UserReadDTO } from './user-read.dto';

export class UserLoginReadDTO extends UserReadDTO {
  readonly token: string;
}
