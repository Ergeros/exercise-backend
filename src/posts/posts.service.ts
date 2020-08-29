import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import Post from './post.entity';
import User from 'src/users/user.entity';

import * as fs from 'fs';

@Injectable()
export default class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  public async findUsersPosts(userId: string): Promise<Post[]> {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'u')
      .where('u.id = :id', { id: userId })
      .getMany();
  }

  public async findOne(id: string): Promise<Post> {
    return await this.postRepository.findOne(id);
  }

  public async create(post: Post, userId: string): Promise<Post> {
    const user = await this.userRepository.findOne(userId);
    post.user = user;
    return await this.postRepository.save(post);
  }

  public async updateOne(id: string, post: Post): Promise<Post> {
    return await this.postRepository.save(post);
  }

  public async delete(id: string): Promise<DeleteResult> {
    const post = await this.postRepository.findOne(id);
    if (post) {
      fs.unlink(`/var/lib/data/${post.imagePath}`, err => {
        if (err) {
          throw err;
        }
      });
    }
    return await this.postRepository.delete(id);
  }
}
