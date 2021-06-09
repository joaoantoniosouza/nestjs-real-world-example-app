import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '~/user/user.entity';
import { ArticleData } from './article.interface';
import { Slug } from '~/shared/text/slug/slug.tool';
import { CommentEntity } from './comment.entity';

const slug = new Slug();

@Entity('articles')
export class ArticleEntity implements ArticleData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  body: string;

  @Column({ default: 0 })
  favoritesCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  favorited: boolean;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  author: UserEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable({ name: 'users_favorites_articles' })
  usersFavorites: UserEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];

  @BeforeUpdate()
  @BeforeInsert()
  slugifyTitle() {
    this.slug =
      slug.slugify(this.title, { lower: true }) + '-' + new Date().getTime();
  }
}
