import { AuthenticatedUser } from '../user.interface';
import { UserReadDTO } from './user-read.dto';

export class UserLoginReadDTO extends UserReadDTO {
  readonly token: string;

  constructor({ user, token }: AuthenticatedUser) {
    super(user);

    this.token = token;
  }
}
