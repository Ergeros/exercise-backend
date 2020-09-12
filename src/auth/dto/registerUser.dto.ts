import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
@Exclude()
export class RegisterUserDTO {
  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;
  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  password: string;
}
