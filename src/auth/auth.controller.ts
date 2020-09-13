import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthenticationGuard } from "./localAuth.guard";
import { RegisterUserDTO } from "../auth/dto/registerUser.dto";
import { UserRO } from "../user/dto/user.response.dto";
import { TransformInterceptor } from "../transform.interceptor";
import UserRequest from "./entity/userRequest.interface";
import { AuthorizedUserDTO } from "./dto/authorizedUser.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}

  @Post("register")
  @UseInterceptors(new TransformInterceptor(UserRO))
  async register(@Body() registrationData: RegisterUserDTO): Promise<UserRO> {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post("login")
  logIn(@Req() request: UserRequest): AuthorizedUserDTO {
    const user = request.user;
    const token = this.authenticationService.signJwtToken(user.id);
    const authorizedUser: AuthorizedUserDTO = {
      token,
      user,
    };
    return authorizedUser;
  }
}
