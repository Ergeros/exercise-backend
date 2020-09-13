import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { UserRepository } from "../user/user.repository";
import { Article } from "./article.entity";
import { ArticleRepository } from "./article.repository";
import { ArticleService } from "./article.service";
import { ArticleRO } from "./dto/article.response";

const mockUser: ArticleRO = {
  id: "test",
  title: "TestTitle",
  perex: "TestPerex",
  content: "TestContent",
  imagePath: "TestPath",
  createdAt: new Date(),
  user: null,
};

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
  find: jest.fn().mockResolvedValueOnce([mockUser]),
}));

describe("ArticleService", () => {
  let service: ArticleService;
  let articleRepository: ArticleRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticleService,
        {
          provide: getRepositoryToken(ArticleRepository),
          useClass: mockRepository,
        },
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    articleRepository = module.get<ArticleRepository>(
      getRepositoryToken(Article)
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  describe("getAllPosts", () => {
    it("should return an array of cats", async () => {
      //jest.spyOn(service, "getAllPosts").mockResolvedValueOnce([mockUser]);

      expect(await service.getAllPosts()).toStrictEqual([mockUser]);
    });
  });
});
