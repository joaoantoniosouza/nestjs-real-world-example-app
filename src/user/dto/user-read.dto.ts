import { Exclude } from 'class-transformer';
import { UserData } from '../user.interface';

export class UserReadDTO implements UserData {
  readonly email: string;

  readonly username: string;

  readonly bio?: string;

  readonly image?: string;

  @Exclude()
  readonly password: string;

  @Exclude()
  readonly id: number;

  @Exclude()
  readonly createdAt: Date;

  @Exclude()
  readonly updatedAt: Date;

  constructor(user: UserData) {
    Object.assign(this, user);
  }
}
