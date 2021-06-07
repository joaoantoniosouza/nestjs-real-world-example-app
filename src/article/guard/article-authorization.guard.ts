import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ArticleService } from '../article.service';

@Injectable()
export class ArticleAuthorizationGuard implements CanActivate {
  constructor(private readonly articleService: ArticleService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { user } = request;
    const { slug } = request.params;

    if (!user || !slug) {
      throw new ForbiddenException('Sem autorização para acessar o artigo.');
    }

    const article = await this.articleService.findBySlug(slug, true);

    if (article.author?.id !== request.user.id) {
      throw new ForbiddenException('Artigo não pertence a este usuário.');
    }

    return true;
  }
}
