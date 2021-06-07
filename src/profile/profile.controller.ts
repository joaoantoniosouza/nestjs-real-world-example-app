import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '~/user/decorators/user.decorator';
import { JwtAuthGuard } from '~/user/guards/jwt.guard';
import { ProfileReadDTO } from './dto/profile-read.dto';
import { ProfileService } from './profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async findProfile(
    @Param('username') username: string,
    @User('id') userId: number,
  ) {
    const profile = await this.profileService.findProfile(username, userId);

    return new ProfileReadDTO(profile);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post(':username/follow')
  async follow(
    @Param('username') username: string,
    @User('id') userId: number,
  ) {
    const profile = await this.profileService.followUser(username, userId);

    return new ProfileReadDTO(profile);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Delete(':username/follow')
  async unfollow(
    @Param('username') username: string,
    @User('id') userId: number,
  ) {
    const profile = await this.profileService.unfollowUser(username, userId);

    return new ProfileReadDTO(profile);
  }
}
