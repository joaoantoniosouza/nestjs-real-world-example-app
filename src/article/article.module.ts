import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { JwtAuthGuard } from '~/user/guards/jwt.guard';
import { UserModule } from '~/user/user.module';
import { UserEntity } from '~/user/user.entity';
import { Slug } from '~/shared/text/slug/slug.tool';
import { ArticleAuthorizationGuard } from './guard/article-authorization.guard';
import { CommentEntity } from './comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity, UserEntity, CommentEntity]),
    UserModule,
  ],
  providers: [ArticleService, JwtAuthGuard, ArticleAuthorizationGuard, Slug],
  controllers: [ArticleController],
})
export class ArticleModule {}
