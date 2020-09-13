import { RegisterUserDTO } from "../auth/dto/registerUser.dto";
import { Repository, EntityRepository } from "typeorm";
import { UserRO } from "./dto/user.response.dto";

import { User } from "./user.entity";
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByEmail(email: string): Promise<User> {
    return await this.findOne({ email });
  }
  async findById(id: string): Promise<User> {
    return await this.findOne(id);
  }
  async createUser(user: RegisterUserDTO): Promise<UserRO> {
    return await this.save(user);
  }
}
