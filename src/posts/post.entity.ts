import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import Comment from '../comments/comment.entity';
import User from '../users/user.entity';
@Entity()
export default class Post {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column()
  title: string;
  @ApiProperty()
  @Column()
  perex: string;
  @ApiProperty()
  @Column()
  content: string;
  @ApiProperty()
  @Column()
  imagePath: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    () => Comment,
    comment => comment.post,
  )
  comments: Comment[];
  @ManyToOne(
    () => User,
    user => user.posts,
  )
  user: User;
}
