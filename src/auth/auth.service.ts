import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import User from '../users/user.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log(user);
    if (user && (await this.passwordsAreEqual(user.password, pass))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async login(user: any): Promise<any> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: User): Promise<User> {
    return this.usersService.createUser(user);
  }

  private async passwordsAreEqual(
    hashedPassword: string,
    plainPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}
