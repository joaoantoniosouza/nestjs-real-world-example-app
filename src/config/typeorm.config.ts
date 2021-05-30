import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';

export const typeormOptions: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: path.resolve(__dirname, '..', 'db', 'data'),
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
};
