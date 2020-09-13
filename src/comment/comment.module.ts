import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentRepository } from "./comment.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleRepository } from "../article/article.repository";

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository, ArticleRepository])],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
