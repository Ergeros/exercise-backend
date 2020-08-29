import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from './post.entity';
import PostService from './posts.service';
import PostController from './posts.controller';
import { CommentsModule } from 'src/comments/comments.module';

import User from 'src/users/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Post, User]), CommentsModule],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostsModule {}
