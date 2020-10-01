import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Comment } from "../comment/comment.entity";
import { UserRepository } from "../user/user.repository";
import { Article } from "./article.entity";
import { ArticleRepository } from "./article.repository";
import { ArticleService } from "./article.service";
import { ArticleRO } from "./dto/article.response";

const mockArticle: ArticleRO = {
  id: "test",
  title: "TestTitle",
  perex: "TestPerex",
  content: "TestContent",
  imagePath: "TestPath",
  createdAt: new Date(),
  owner: null,
};

const mockArticleRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
  find: jest.fn().mockResolvedValueOnce([mockArticle]),
  findOne: jest.fn().mockResolvedValueOnce(mockArticle),
  findUsersPosts: jest.fn().mockResolvedValueOnce([mockArticle, mockArticle]),
  save: jest.fn().mockResolvedValueOnce(mockArticle),
  delete: jest.fn(),
}));

const mockUserRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
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
          useClass: mockArticleRepository,
        },
        {
          provide: getRepositoryToken(UserRepository),
          useValue: mockUserRepository,
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
    it("should return an array of articles", async () => {
      expect(await service.getAllPosts()).toStrictEqual([mockArticle]);
    });
  });
  describe("getPostById", () => {
    it("should return article", async () => {
      expect(await service.getPostById("test")).toStrictEqual(mockArticle);
    });
  });
  describe("findUsersPosts", () => {
    it("should return an array of articles by userId", async () => {
      expect(await service.findUsersPosts("test")).toStrictEqual([
        mockArticle,
        mockArticle,
      ]);
    });
  });
  describe("updateOne", () => {
    it("should return an array of articles by userId", async () => {
      expect(await service.updateOne(mockArticle)).toStrictEqual(mockArticle);
    });
  });
});
