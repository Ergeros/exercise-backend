import { IsNotEmpty, IsString } from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { UserRO } from "../../user/dto/user.response.dto";
@Exclude()
export class AuthorizedUserDTO {
  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  @IsString()
  token: string;
  @ApiProperty({ required: true })
  @Expose()
  @IsNotEmpty()
  @IsString()
  user: UserRO;
}
