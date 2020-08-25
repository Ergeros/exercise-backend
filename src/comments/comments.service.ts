import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Comment from './comment.entity';
import Post from '../posts/post.entity';
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}
  public async findCommentsByPostId(postId: string): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { post: { id: postId } },
    });
  }

  public async createCommentToPost(
    postId: string,
    comment: Comment,
  ): Promise<Comment> {
    const post = await this.postRepository.findOne(postId);
    comment.post = post;
    return await this.commentRepository.save(comment);
  }
}
