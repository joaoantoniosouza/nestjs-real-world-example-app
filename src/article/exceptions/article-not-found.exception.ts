import { NotFoundException } from '@nestjs/common';

export class ArticleNotFoundException extends NotFoundException {
  constructor() {
    super('Artigo não encontrado');
  }
}
