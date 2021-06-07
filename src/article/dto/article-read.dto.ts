import { ProfileReadDTO } from '~/profile/dto';
import { ArticleEntity } from '../article.entity';

export class ArticleReadDTO {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly body: string;
  readonly tagList: string[];
  readonly favorited: boolean;
  readonly favoritesCount: number;
  readonly author: ProfileReadDTO;

  constructor(article: ArticleEntity) {
    this.slug = article.slug;
    this.title = article.title;
    this.description = article.description;
    this.body = article.body;
    this.favoritesCount = article.favoritesCount;
    this.favorited = article.favorited;
    this.author = article.author && new ProfileReadDTO(article.author);
  }
}
