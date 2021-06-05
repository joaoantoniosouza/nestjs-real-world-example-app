import { Exclude } from 'class-transformer';
import { UserEntity } from '~/user/user.entity';
import { Profile } from '../profile.interface';

export class ProfileReadDTO implements Profile {
  readonly username: string;
  readonly bio: string;
  readonly image: string;
  readonly following: boolean;

  @Exclude()
  readonly id: number;

  @Exclude()
  readonly email: string;

  @Exclude()
  readonly password: string;

  @Exclude()
  readonly createdAt: Date;

  @Exclude()
  readonly updatedAt: Date;

  constructor(profile: UserEntity, isFollowing: boolean) {
    Object.assign(this, profile);

    this.following = isFollowing;
  }
}
