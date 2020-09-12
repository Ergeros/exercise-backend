import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { Article } from 'src/article/article.entity';
import { ArticleRepository } from 'src/article/article.repository';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: CommentRepository,
    @InjectRepository(Article)
    private readonly articleRepository: ArticleRepository,
  ) {}
  public async findCommentsByPostId(postId: string): Promise<Comment[]> {
    return this.commentRepository.findCommentsByPostId(postId);
  }
  async createComment(postId: string, comment: Comment): Promise<Comment> {
    const article = await this.articleRepository.findOne(postId);
    comment.article = article;
    return await this.commentRepository.save(comment);
  }
}
