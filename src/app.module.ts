import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { applicationConfig, typeormConfig } from './config';
import { ArticleModule } from './article/article.module';
import { ProfileModule } from './profile/profile.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${ENV}.local`, `.env.${ENV}`, '.env', '.env.example'],
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [applicationConfig],
    }),
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    ArticleModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
