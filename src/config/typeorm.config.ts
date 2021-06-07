import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: path.resolve(__dirname, '..', '..', 'db', 'data.db3'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
  logger: 'advanced-console',
  logging: 'all',
};
