import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import Comment from '../comments/comment.entity';
@Entity()
export default class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  perex: string;

  @Column()
  content: string;
  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(
    type => Comment,
    comment => comment.post,
  )
  comments: Comment[];
}
