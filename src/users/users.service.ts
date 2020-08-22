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

  public async findOne(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
  public async createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
