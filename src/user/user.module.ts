import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashTool } from '@security/hash';
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
  providers: [UserService, HashTool],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
