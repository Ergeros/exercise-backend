import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import Post from '../posts/post.entity';

@Entity()
export default class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  content: string;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(
    type => Post,
    post => post.comments,
  )
  post: Post;
}
