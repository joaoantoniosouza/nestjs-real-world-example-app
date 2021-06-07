import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { User } from '~/user/decorators/user.decorator';
import { JwtAuthGuard } from '~/user/guards/jwt.guard';
import { ArticleService } from './article.service';
import { ArticleUpdateDTO, ArticleReadDTO } from './dto';
import { ArticleAuthorizationGuard } from './guard/article-authorization.guard';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @User('id') userId: number,
    @Body('article') articleData: ArticleUpdateDTO,
  ) {
    const newArticle = await this.articleService.create(articleData, userId);

    return new ArticleReadDTO(newArticle);
  }

  @Get()
  async listAllArticles(@Query() query: any) {
    const allArticles = await this.articleService.listAll({
      author: query.author,
      favoritedByUser: query.favorited,
      limit: query.limit,
      offset: query.offset,
      tag: query.tag,
    });

    const articles = allArticles.map((article) => new ArticleReadDTO(article));

    return { articles, articlesCount: articles.length };
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('feed')
  async getFeed(@User('id') userId: number) {
    const articles = await this.articleService.getFeed(userId);
    const feed = articles.map((article) => new ArticleReadDTO(article));

    return {
      articles: feed,
      articleCount: articles.length,
    };
  }

  @UseGuards(ArticleAuthorizationGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Put(':slug')
  async update(
    @Param('slug') slug: string,
    @Body('article') articleData: ArticleUpdateDTO,
  ) {
    const article = await this.articleService.update(slug, articleData);

    return { article: new ArticleReadDTO(article) };
  }

  @UseGuards(ArticleAuthorizationGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    await this.articleService.delete(slug);

    return { message: 'Artigo deletado.' };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':slug/favorite')
  async favorite(@Param('slug') slug: string, @User('id') userId: number) {
    const article = await this.articleService.favorite(userId, slug);

    return { article: new ArticleReadDTO(article) };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':slug/favorite')
  async unFavorite(@Param('slug') slug: string, @User('id') userId: number) {
    const article = await this.articleService.unFavorite(userId, slug);

    return { article: new ArticleReadDTO(article) };
  }
}
