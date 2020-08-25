/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthenticationGuard } from './localAuth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: any) {
    return this.authenticationService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async logIn(@Req() request: any) {
    const user = request.user;
    user.password = undefined;
    const token = this.authenticationService.signJwtToken(user.id);
    return {
      token,
      user,
    };
  }
}
