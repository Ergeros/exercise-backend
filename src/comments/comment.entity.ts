import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import Post from '../posts/post.entity';

@Entity()
export default class Comment {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: string;
  @ApiProperty()
  @Column()
  content: string;
  @ApiProperty()
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
