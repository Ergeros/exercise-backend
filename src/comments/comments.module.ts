import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Comment from './comment.entity';
import Post from 'src/posts/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post])],
  controllers: [],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
