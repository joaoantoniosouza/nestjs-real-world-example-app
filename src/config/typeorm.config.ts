import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const developmentConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: path.resolve(__dirname, '..', '..', 'db', 'data.db3'),
  logging: 'all',
};

const productionConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: true,
  logging: false,
};

const configToMerge =
  process.env.NODE_ENV === 'production' ? productionConfig : developmentConfig;

export const typeormConfig: TypeOrmModuleOptions = {
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logger: 'advanced-console',
  ...configToMerge,
};
