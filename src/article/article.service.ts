import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '~/user/user.entity';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { ArticleUpdateDTO, ArticleCreateDTO } from './dto';
import { CommentCreateDTO } from './dto/comment-create.dto';
import { ListArticlesQuery } from './dto/list-articles-query.dto';
import { ArticleNotFoundException } from './exceptions/article-not-found.exception';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(articleData: ArticleCreateDTO, userId: number) {
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
      throw new ArticleNotFoundException();
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

  async listAll(options: ListArticlesQuery): Promise<ArticleEntity[]> {
    const query = this.articleRepository
      .createQueryBuilder('article')
      .innerJoinAndSelect('article.author', 'author');

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
      .innerJoinAndSelect('articles.author', 'author')
      .innerJoin('author.follows', 'follows')
      .where('follows.followerId = :userId', { userId })
      .orderBy('articles.createdAt', 'DESC')
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
      throw new ArticleNotFoundException();
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
      throw new ArticleNotFoundException();
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

  async getComments(slug: string) {
    const comments = await this.commentRepository
      .createQueryBuilder('comments')
      .innerJoin('comments.article', 'article')
      .innerJoinAndSelect('comments.author', 'author')
      .where('article.slug = :slug', { slug })
      .getMany();

    if (!comments.length) {
      throw new ArticleNotFoundException();
    }

    return comments;
  }

  async addComment(userId: number, slug: string, comment: CommentCreateDTO) {
    const [user, article] = await Promise.all([
      this.userRepository.findOne(userId),
      this.articleRepository.findOne({ slug }),
    ]);

    if (!article) {
      throw new ArticleNotFoundException();
    }

    const newComment = this.commentRepository.create(comment);

    newComment.author = user;
    newComment.article = article;

    return this.commentRepository.save(newComment);
  }

  async deleteComment(slug: string, commentId: number) {
    const article = await this.articleRepository.findOne({ slug });

    if (!article) {
      throw new ArticleNotFoundException();
    }

    return this.commentRepository.delete({ id: commentId });
  }
}
