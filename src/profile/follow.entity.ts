import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from '~/user/user.entity';

@Entity('follows')
export class FollowEntity {
  @PrimaryColumn()
  followerId: number;

  @PrimaryColumn()
  followingId: number;

  @ManyToOne(() => UserEntity, (user) => user.followers)
  follower: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.follows)
  following: UserEntity;
}
