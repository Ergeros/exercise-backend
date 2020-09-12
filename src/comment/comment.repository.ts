import { Repository, EntityRepository } from 'typeorm';
import { Comment } from './comment.entity';
@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async findCommentsByPostId(postId: string): Promise<Comment[]> {
    return this.find({
      where: { post: { id: postId } },
    });
  }
}
