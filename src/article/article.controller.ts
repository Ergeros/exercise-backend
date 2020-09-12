import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleDTO } from './dto/article.dto';
import { Comment } from '../comment/comment.entity';
import { TransformInterceptor } from 'src/transform.interceptor';
import { CommentService } from 'src/comment/comment.service';
import { DeleteResult } from 'typeorm';
import { ArticleRO } from './dto/article.response';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';
import UserRequest from 'src/auth/entity/userRequest.interface';
@Controller('articles')
@UseInterceptors(new TransformInterceptor(ArticleRO))
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly commentService: CommentService,
  ) {}
  @Get()
  async getAllPosts(): Promise<ArticleRO[]> {
    return await this.articleService.getAllPosts();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<ArticleRO> {
    return this.articleService.getPostById(id);
  }

  @Get('u/posts')
  @UseGuards(JwtAuthGuard)
  async getUsersPosts(@Req() request: UserRequest): Promise<ArticleRO[]> {
    return this.articleService.findUsersPosts(request.user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() post: ArticleDTO,
    @Req() request: UserRequest,
  ): Promise<ArticleRO> {
    return await this.articleService.createPost(post, request.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Param('id') id: string,
    @Body() updatedPost: ArticleRO,
  ): Promise<ArticleRO> {
    return this.articleService.updateOne(id, updatedPost);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id') id: string): Promise<DeleteResult> {
    return this.articleService.delete(id);
  }
  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  async createPostComments(
    @Param('id') id: string,
    @Body() comment: Comment,
  ): Promise<Comment> {
    return this.commentService.createComment(id, comment);
  }
  @Get(':id/comments')
  async getPostComments(@Param('id') id: string): Promise<Comment[]> {
    return this.commentService.findCommentsByPostId(id);
  }
}
