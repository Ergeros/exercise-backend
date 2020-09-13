import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ArticleRepository } from "../article/article.repository";
import { CommentRepository } from "./comment.repository";
import { CommentService } from "./comment.service";

const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
    find: jest.fn(),
  },
}));

describe("CommentService", () => {
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(CommentRepository),
          useValue: mockRepository,
        },
        {
          provide: getRepositoryToken(ArticleRepository),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
