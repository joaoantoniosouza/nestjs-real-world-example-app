import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '~/user/user.entity';
import { ArticleEntity } from './article.entity';
import { ArticleUpdateDTO } from './dto';

type ListOptions = {
  tag?: string;
  author?: string;
  favoritedByUser?: string;
  limit?: number;
  offset?: number;
};

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(articleData: ArticleUpdateDTO, userId: number) {
    const newArticle = this.articleRepository.create(articleData);

    const author = await this.userRepository.findOne(userId);
    newArticle.author = author;

    return this.articleRepository.save(newArticle);
  }

  async update(slug: string, articleData: ArticleUpdateDTO) {
    const article = await this.articleRepository.findOne({
      relations: ['author'],
      where: {
        slug,
      },
    });

    if (!article) {
      throw new NotFoundException('Artigo não encontrado.');
    }

    return this.articleRepository.save({
      ...article,
      ...articleData,
    });
  }

  async delete(slug: string) {
    await this.articleRepository.delete({ slug });
  }

  async findBySlug(slug: string, includeAuthor: boolean) {
    return this.articleRepository.findOne({
      where: { slug },
      relations: includeAuthor && ['author'],
    });
  }

  async listAll(options: ListOptions): Promise<ArticleEntity[]> {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .innerJoinAndSelect('article.author', 'author')
      .innerJoinAndSelect('author.follows', 'followers');

    if (options.author) {
      query.where('author.username = :username', { username: options.author });
    }

    if (options.limit) {
      query.limit(options.limit);
    }

    if (options.offset) {
      query.offset(options.offset);
    }

    return query.getMany();
  }

  async getFeed(userId: number) {
    return this.articleRepository
      .createQueryBuilder('articles')
      .innerJoin('articles.author', 'author')
      .innerJoin('author.follows', 'follows')
      .where('follows.followerId = :userId', { userId })
      .getMany();
  }

  async favorite(userId: number, slug: string) {
    const article = await this.articleRepository.findOne({
      where: {
        slug,
      },
      relations: ['usersFavorites', 'author'],
    });

    if (!article) {
      throw new NotFoundException('Artigo não encontrado.');
    }

    const articleIsFavorite = article.usersFavorites.find(
      (user) => user.id === userId,
    );

    article.favorited = true;
    if (!articleIsFavorite) {
      const user = await this.userRepository.findOne(userId);
      article.usersFavorites.push(user);
      article.favoritesCount++;

      await this.articleRepository.save(article, { reload: true });
    }

    return article;
  }

  async unFavorite(userId: number, slug: string) {
    const article = await this.articleRepository.findOne({
      where: {
        slug,
      },
      relations: ['usersFavorites', 'author'],
    });

    if (!article) {
      throw new NotFoundException('Artigo não encontrado.');
    }

    const indexToRemove = article.usersFavorites.findIndex(
      (user) => user.id === userId,
    );

    article.favorited = false;
    if (indexToRemove) {
      article.usersFavorites.splice(indexToRemove, 1);
      article.favoritesCount--;

      await this.articleRepository.save(article, { reload: true });
    }

    return article;
  }
}
