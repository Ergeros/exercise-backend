import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import User from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ email });
  }
  public async findById(id: string): Promise<User> {
    return await this.userRepository.findOne(id);
  }
  public async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
