import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Post from './post.entity';
import PostService from './posts.service';
import PostController from './posts.controller';
import { CommentsModule } from 'src/comments/comments.module';
@Module({
  imports: [TypeOrmModule.forFeature([Post]), CommentsModule],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService],
})
export class PostsModule {}
