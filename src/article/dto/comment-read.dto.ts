import { ProfileReadDTO } from '~/profile/dto';
import { CommentEntity } from '../comment.entity';

export class CommentReadDTO {
  readonly id: number;
  readonly body: string;
  readonly author: ProfileReadDTO;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(comment: CommentEntity) {
    this.id = comment.id;
    this.body = comment.body;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
    this.author = comment.author && new ProfileReadDTO(comment.author);
  }
}
