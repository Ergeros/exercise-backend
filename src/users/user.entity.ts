import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import Post from '../posts/post.entity';

@Entity()
export default class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty()
  @Column()
  firstName: string;
  @ApiProperty()
  @Column()
  lastName: string;
  @ApiProperty()
  @Column()
  email: string;
  @ApiProperty()
  @Column()
  password: string;

  @CreateDateColumn()
  registered: Date;
  @OneToMany(
    () => Post,
    post => post.user,
  )
  posts: Post[];
}
