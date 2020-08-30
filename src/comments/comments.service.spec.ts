import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import Comment from './comment.entity';
import { Repository } from 'typeorm';

describe('CommentsService', () => {
  let service: CommentsService;
  let productRepository: Repository<Comment>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentsService],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
