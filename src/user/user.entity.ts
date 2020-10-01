import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { Article } from "../article/article.entity";

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn("uuid")
  id: string;
  @ApiProperty()
  @Column()
  firstName: string;
  @ApiProperty()
  @Column()
  lastName: string;
  @ApiProperty()
  @Column({ unique: true })
  email: string;
  @ApiProperty()
  @Column()
  password: string;

  @CreateDateColumn()
  registered: Date;
  @OneToMany(
    () => Article,
    (article) => article.owner
  )
  articles: Article[];
}
