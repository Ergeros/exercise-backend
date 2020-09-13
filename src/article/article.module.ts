import { Module } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { ArticleController } from "./article.controller";
import { ArticleRepository } from "./article.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentModule } from "../comment/comment.module";
import { UserModule } from "../user/user.module";
import { UserRepository } from "../user/user.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleRepository, UserRepository]),
    CommentModule,
    UserModule,
  ],
  providers: [ArticleService],
  controllers: [ArticleController],
})
export class ArticleModule {}
