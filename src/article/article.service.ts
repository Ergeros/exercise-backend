import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleRepository } from './article.repository';
import { ArticleDTO } from './dto/article.dto';
import { DeleteResult } from 'typeorm';
import { ArticleRO } from './dto/article.response';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: ArticleRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async getAllPosts(): Promise<ArticleRO[]> {
    return await this.articleRepository.find();
  }

  async getPostById(id: string): Promise<ArticleRO> {
    return await this.articleRepository.findOne(id);
  }
  async findUsersPosts(userId: string): Promise<ArticleRO[]> {
    return await this.articleRepository.findUsersPosts(userId);
  }

  async createPost(post: ArticleDTO, userId: string): Promise<ArticleRO> {
    const user = await this.userRepository.findOne(userId);
    const newArticle: Partial<Article> = { ...post };
    newArticle.user = user;

    return await this.articleRepository.save(newArticle);
  }

  public async updateOne(id: string, post: ArticleDTO): Promise<ArticleRO> {
    return await this.articleRepository.save(post);
  }

  public async delete(id: string): Promise<DeleteResult> {
    const post = await this.articleRepository.findOne(id);
    if (post) {
      /* fs.unlink(`/var/lib/data/${post.imagePath}`, err => {
        if (err) {
          throw err;
        }
      }); */
    }
    return await this.articleRepository.delete(id);
  }
}
