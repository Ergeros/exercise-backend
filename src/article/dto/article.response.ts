import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose, Transform, Type } from "class-transformer";
import { User } from "../../user/user.entity";
@Exclude()
export class ArticleRO {
  @Expose()
  @ApiProperty({ required: true })
  @IsString()
  readonly id: string;
  @Expose()
  @ApiProperty({ required: true })
  @IsString()
  readonly title: string;
  @Expose()
  @ApiProperty({ required: true })
  @IsString()
  readonly perex: string;
  @Expose()
  @ApiProperty({ required: true })
  @IsString()
  readonly content: string;
  @Expose()
  @ApiProperty({ required: true })
  @IsString()
  readonly imagePath: string;
  @Expose()
  @ApiProperty({ required: true })
  @Type(() => Date)
  readonly createdAt: Date;
  @Expose()
  @ApiProperty({ required: true })
  @Transform((user) => `${user.firstName} ${user.lastName}`)
  user: User;
}
