import { ProfileReadDTO } from '~/profile/dto';
import { CommentEntity } from '../comment.entity';

export interface CommentReadAttributes {
  id: number;
  body: string;
  author: ProfileReadDTO;
  createdAt: Date;
  updatedAt: Date;
}

export class CommentReadDTO {
  readonly comment: CommentReadAttributes;

  constructor(comment: CommentEntity) {
    this.comment = {
      id: comment.id,
      body: comment.body,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      author: comment.author && new ProfileReadDTO(comment.author),
    };
  }
}
