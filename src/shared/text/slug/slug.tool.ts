import { Injectable } from '@nestjs/common';
import { ISlug, SlugifyOptions } from './slug.interface';
import slugify from 'slugify';

@Injectable()
export class Slug implements ISlug {
  slugify(text: string, options?: SlugifyOptions): string {
    return slugify(text, options);
  }
}

export default new Slug();
