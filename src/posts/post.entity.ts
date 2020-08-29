import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import Comment from '../comments/comment.entity';
import User from '../users/user.entity';
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
