import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import PostsService from './posts.service';
import PostEntity from './post.entity';
import { CommentsService } from '../comments/comments.service';
import Comment from '../comments/comment.entity';
import JwtAuthGuard from 'src/auth/jwtAuth.guard';

@Controller('posts')
export default class PostController {
  constructor(
    private readonly postService: PostsService,
    private readonly commentService: CommentsService,
  ) {}

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get('u/posts')
  @UseGuards(JwtAuthGuard)
  async getUsersPosts(@Req() request): Promise<PostEntity[]> {
    return this.postService.findUsersPosts(request.user.id);
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(id);
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Body() post: PostEntity,
    @Req() request,
  ): Promise<PostEntity> {
    return this.postService.create(post, request.user.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Param('id') id: string,
    @Body() updatedPost: PostEntity,
  ): Promise<PostEntity> {
    return this.postService.updateOne(id, updatedPost);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Param('id') id: string): Promise<DeleteResult> {
    return this.postService.delete(id);
  }
  @Post(':id/comments')
  @UseGuards(JwtAuthGuard)
  async createPostComments(
    @Param('id') id: string,
    @Body() comment: Comment,
  ): Promise<Comment> {
    return this.commentService.createCommentToPost(id, comment);
  }
  @Get(':id/comments')
  async getPostComments(@Param('id') id: string): Promise<Comment[]> {
    return this.commentService.findCommentsByPostId(id);
  }
}
