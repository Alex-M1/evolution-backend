import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) readonly entity: Repository<UserEntity>,
  ) {}
  async saveUser(login: string, password_hash: string) {
    const user = this.entity.create({ login, password_hash });
    return await this.entity.save(user);
  }
}
