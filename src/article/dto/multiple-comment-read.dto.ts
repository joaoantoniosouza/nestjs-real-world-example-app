import { CommentEntity } from '../comment.entity';
import { CommentReadAttributes, CommentReadDTO } from './comment-read.dto';

export class MultipleCommentReadDTO {
  readonly comments: CommentReadAttributes[];
  readonly commentsCount: number;

  constructor(comments: CommentEntity[]) {
    this.comments = comments.map(
      (comment) => new CommentReadDTO(comment).comment,
    );
    this.commentsCount = comments.length;
  }
}
