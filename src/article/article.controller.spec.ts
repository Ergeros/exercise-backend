import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CommentRepository } from "../comment/comment.repository";
import { CommentService } from "../comment/comment.service";
import { UserRepository } from "../user/user.repository";
import { ArticleController } from "./article.controller";
import { Article } from "./article.entity";
import { ArticleRepository } from "./article.repository";
import { ArticleService } from "./article.service";

describe("ArticleController", () => {
  let controller: ArticleController;
  let service: ArticleService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        ArticleService,
        CommentService,
        {
          provide: getRepositoryToken(ArticleRepository),
          useClass: ArticleRepository,
        },
        {
          provide: getRepositoryToken(UserRepository),
          useClass: UserRepository,
        },
        {
          provide: getRepositoryToken(CommentRepository),
          useClass: CommentRepository,
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);

    controller = module.get<ArticleController>(ArticleController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
