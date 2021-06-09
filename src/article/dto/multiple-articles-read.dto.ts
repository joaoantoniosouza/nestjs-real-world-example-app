import { ArticleEntity } from '../article.entity';
import { ArticleReadAttributes, ArticleReadDTO } from './article-read.dto';

export class MultipleArticleReadDTO {
  readonly articles: ArticleReadAttributes[];
  readonly articleCount: number;

  constructor(articles: ArticleEntity[]) {
    this.articles = articles.map(
      (article) => new ArticleReadDTO(article).article,
    );
    this.articleCount = articles.length;
  }
}
