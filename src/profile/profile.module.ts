import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { FollowEntity } from './follow.entity';
import { UserEntity } from '~/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '~/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, FollowEntity]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('application.jwt'),
      inject: [ConfigService],
    }),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}
