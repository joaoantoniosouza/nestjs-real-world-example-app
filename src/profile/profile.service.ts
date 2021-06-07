import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '~/user/user.entity';
import { FollowEntity } from './follow.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(FollowEntity)
    private readonly followsRepository: Repository<FollowEntity>,
  ) {}

  private async getProfileByUsername(username: string) {
    const profile = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });

    if (!profile) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    return profile;
  }

  private async getFollow(userId: number, profileId: number) {
    return this.followsRepository.findOne({
      where: {
        followerId: userId,
        followingId: profileId,
      },
    });
  }

  async findProfile(username: string, userId: number) {
    const profile = await this.getProfileByUsername(username);
    const follow = await this.getFollow(userId, profile.id);

    profile.following = !!follow;

    return profile;
  }

  async followUser(username: string, userId: number) {
    const profile = await this.getProfileByUsername(username);

    const follow = await this.getFollow(userId, profile.id);

    if (!follow) {
      const newFollow = this.followsRepository.create({
        followerId: userId,
        followingId: profile.id,
      });

      await this.followsRepository.save(newFollow);
    }

    profile.following = true;

    return profile;
  }

  async unfollowUser(username: string, userId: number) {
    const profile = await this.getProfileByUsername(username);

    const follow = await this.getFollow(userId, profile.id);

    await this.followsRepository.delete(follow);

    profile.following = false;

    return profile;
  }
}
