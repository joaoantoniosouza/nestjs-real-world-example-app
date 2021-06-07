import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ArticleEntity } from '~/article/article.entity';
import { HashTool } from '~/shared/security/hash';
import { UserData } from './user.interface';

const hashTool = new HashTool();

@Entity('users')
export class UserEntity implements UserData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, default: '' })
  bio: string;

  @Column({ nullable: true })
  image?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => ArticleEntity, (article) => article.author)
  articles: ArticleEntity[];

  @BeforeUpdate()
  setUpdatedDate() {
    this.updatedAt = new Date();
  }

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashTool.generate(this.password);
  }

  @BeforeUpdate()
  async updatePasswordHash() {
    if (this.password) {
      this.password = await hashTool.generate(this.password);
    }
  }
}
