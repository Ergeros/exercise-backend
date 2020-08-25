import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
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
  @UseGuards(JwtAuthGuard)
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(id);
  }
  //@UseGuards(AuthGuard('jwt'))
  @Post()
  async createPost(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.create(post);
  }

  //@UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updatePost(
    @Param('id') id: string,
    @Body() updatedPost: PostEntity,
  ): Promise<UpdateResult> {
    return this.postService.updateOne(id, updatedPost);
  }
  //@UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<DeleteResult> {
    return this.postService.delete(id);
  }
  @Post(':id/comments')
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
