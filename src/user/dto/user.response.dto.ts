import { IsNotEmpty, IsString, IsEmail, IsDefined } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
@Exclude()
export class UserRO {
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly id: string;
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
  @Expose()
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
}
