import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { User } from "../user/user.entity";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDTO } from "../auth/dto/registerUser.dto";
import { UserRO } from "../user/dto/user.response.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async register(user: RegisterUserDTO): Promise<UserRO> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    try {
      user.password = hashedPassword;
      const createdUser = await this.userService.createUser(user);
      return createdUser;
    } catch (error) {
      if (error?.code === "23505") {
        throw new HttpException(
          "User with that email already exists",
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  public async getAuthenticatedUser(
    email: string,
    plainTextPassword: string
  ): Promise<User> {
    try {
      const user = await this.userService.findByEmail(email);
      await this.verifyPassword(plainTextPassword, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }
  public signJwtToken(userId: string): string {
    return this.jwtService.sign({ userId });
  }
}
