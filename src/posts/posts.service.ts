import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import Post from './post.entity';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  public async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  public async findOne(id: string): Promise<Post> {
    return await this.postRepository.findOneOrFail(id);
  }

  public async create(post: Post): Promise<Post> {
    return await this.postRepository.save(post);
  }

  public async updateOne(post: Post): Promise<Post> {
    return await this.postRepository.save(post);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.postRepository.delete(id);
  }
}
