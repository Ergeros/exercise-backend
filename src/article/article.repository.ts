import { Repository, EntityRepository } from 'typeorm';
import { Article } from './article.entity';
@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async findUsersPosts(userId: string): Promise<Article[]> {
    return await this.createQueryBuilder('article')
      .leftJoin('article.user', 'u')
      .where('u.id = :id', { id: userId })
      .getMany();
  }
}
