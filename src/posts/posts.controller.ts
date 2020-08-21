import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Put,
} from '@nestjs/common';
import PostsService from './posts.service';
import PostEntity from './post.entity';

@Controller('posts')
export default class PostController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  async createPost(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.create(post);
  }

  @Get()
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(id);
  }
}
