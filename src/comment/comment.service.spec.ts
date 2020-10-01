import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ArticleRepository } from "../article/article.repository";
import { Comment } from "./comment.entity";
import { CommentRepository } from "./comment.repository";
import { CommentService } from "./comment.service";
import { Article } from "../article/article.entity";

const mockComment: Comment = {
  id: 10,
  content: "testContent",
  author: "author",
  createdAt: new Date(),
  article: null,
};

const mockArticle: Article = {
  id: "test1",
  title: "TestTitle1",
  perex: "TestPerex1",
  content: "TestContent1",
  imagePath: "TestPath1",
  createdAt: new Date(),
  owner: null,
  comments: [],
};

const mockCommentRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
  find: jest.fn(),
  findCommentsByPostId: jest.fn().mockResolvedValueOnce([mockComment]),
  save: jest.fn().mockResolvedValueOnce(mockComment),
}));

const mockArticleRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
  findOne: jest.fn().mockResolvedValueOnce(mockArticle),
}));

describe("CommentService", () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(CommentRepository),
          useClass: mockCommentRepository,
        },
        {
          provide: getRepositoryToken(ArticleRepository),
          useClass: mockArticleRepository,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
  describe("findCommentsByPostId", () => {
    it("should return an array of comments by articleId", async () => {
      expect(await service.findCommentsByPostId("test")).toStrictEqual([
        mockComment,
      ]);
    });
  });
  describe("createComment", () => {
    it("should return saved comment in database", async () => {
      const expectedComment: Comment = {
        ...mockComment,
        article: mockArticle,
      };
      expect(await service.createComment("test", mockComment)).toStrictEqual(
        expectedComment
      );
    });
  });
});
