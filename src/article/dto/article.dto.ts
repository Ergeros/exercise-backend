import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class ArticleDTO {
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
}
