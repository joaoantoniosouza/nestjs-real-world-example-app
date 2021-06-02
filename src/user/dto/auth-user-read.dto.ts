import { UserData } from '../user.interface';
import { UserReadDTO } from './user-read.dto';

export class UserLoginReadDTO extends UserReadDTO {
  readonly token: string;

  constructor(user: UserData, accessToken: string) {
    super(user);

    this.token = accessToken;
  }
}
