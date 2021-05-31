import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormOptions } from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${ENV}.local`, `.env.${ENV}`, '.env'],
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [applicationConfig],
    }),
    TypeOrmModule.forRoot(typeormOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
