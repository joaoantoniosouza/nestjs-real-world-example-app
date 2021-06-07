import { ArticleCreateDTO } from './article-create.dto';
import { PartialType } from '@nestjs/mapped-types';

export class ArticleUpdateDTO extends PartialType(ArticleCreateDTO) {}
