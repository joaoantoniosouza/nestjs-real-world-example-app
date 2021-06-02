import { Hash } from './hash.interface';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashTool implements Hash {
  generate(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  isMatch(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
