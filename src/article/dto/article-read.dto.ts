import { ProfileReadDTO } from '~/profile/dto';
import { ArticleEntity } from '../article.entity';

export interface ArticleReadAttributes {
  slug: string;
  title: string;
  description: string;
  body: string;
  favorited: boolean;
  favoritesCount: number;
  author: ProfileReadDTO;
  createdAt: Date;
  updatedAt: Date;
}

export class ArticleReadDTO {
  readonly article: ArticleReadAttributes;

  constructor(article: ArticleEntity) {
    this.article = {
      slug: article.slug,
      title: article.title,
      description: article.description,
      body: article.body,
      favoritesCount: article.favoritesCount,
      favorited: article.favorited,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      author: article.author && new ProfileReadDTO(article.author),
    };
  }
}
