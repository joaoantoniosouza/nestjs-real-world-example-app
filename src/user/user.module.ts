import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashTool } from '~/shared/security/hash';
import { JwtAuthGuard } from './guards/jwt.guard';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) =>
        configService.get('application.jwt'),
      inject: [ConfigService],
    }),
  ],
  providers: [UserService, HashTool, JwtAuthGuard],
  controllers: [UserController],
  exports: [UserService, JwtModule],
})
export class UserModule {}
