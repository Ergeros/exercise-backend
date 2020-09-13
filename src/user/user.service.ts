import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import { RegisterUserDTO } from "../auth/dto/registerUser.dto";
import { UserRO } from "./dto/user.response.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
  async findById(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }
  async createUser(user: RegisterUserDTO): Promise<UserRO> {
    return await this.userRepository.createUser(user);
  }
}
