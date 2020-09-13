import { Injectable } from "@nestjs/common";
import { Comment } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { ArticleRepository } from "../article/article.repository";

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly articleRepository: ArticleRepository
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
