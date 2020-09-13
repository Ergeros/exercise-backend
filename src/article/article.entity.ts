import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Comment } from "../comment/comment.entity";
import { User } from "../user/user.entity";
@Entity()
export class Article {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  perex: string;

  @Column()
  content: string;

  @Column()
  imagePath: string;

  @CreateDateColumn()
  createdAt: Date;
  @OneToMany(
    () => Comment,
    (comment) => comment.article
  )
  comments: Comment[];
  @ManyToOne(
    () => User,
    (user) => user.articles,
    {
      eager: true,
    }
  )
  user: User;
}
