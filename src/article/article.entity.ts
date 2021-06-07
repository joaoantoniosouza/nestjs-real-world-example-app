import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '~/user/user.entity';
import { ArticleData } from './article.interface';
import { Slug } from '~/shared/text/slug/slug.tool';

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

  @ManyToOne(() => UserEntity, (user) => user.articles, {
    nullable: false,
    createForeignKeyConstraints: true,
    onDelete: 'CASCADE',
  })
  author: UserEntity;

  @ManyToMany(() => UserEntity)
  @JoinTable({ name: 'users_favorites_articles' })
  usersFavorites: UserEntity[];

  @BeforeUpdate()
  @BeforeInsert()
  slugifyTitle() {
    this.slug = slug.slugify(this.title, { lower: true });
  }
}
