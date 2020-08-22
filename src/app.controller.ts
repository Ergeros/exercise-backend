import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import User from './users/user.entity';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async login(@Body() user: User): Promise<any> {
    return this.authService.login(user);
  }

  @Post('register')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async register(@Body() user: User): Promise<any> {
    return this.authService.register(user);
  }
}
