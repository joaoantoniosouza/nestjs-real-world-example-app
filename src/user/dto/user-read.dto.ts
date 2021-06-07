import { UserData } from '../user.interface';

export class UserReadDTO {
  readonly email: string;

  readonly username: string;

  readonly bio?: string;

  readonly image?: string;

  constructor(user: UserData) {
    this.email = user.email;
    this.username = user.username;
    this.bio = user.bio;
    this.image = user.image;
  }
}
