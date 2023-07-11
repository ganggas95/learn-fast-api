import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashPassword } from 'src/utils/password-utils';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(payload: CreateUserDto): Promise<Partial<User> | null> {
    try {
      const user: User = this.userRepository.create(payload);
      user.password = await hashPassword(payload.password);
      return await this.userRepository.save(user);
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async update(
    id: string,
    payload: UpdateUserDto,
  ): Promise<Partial<User> | null> {
    try {
      const user: User | null = await this.findOne(id);
      if (user) {
        user.name = payload.name;
        return await this.userRepository.save(user);
      } else throw Error('User not found');
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<User> {
    const user: User | null = await this.findOne(id);
    if (user) return await this.userRepository.remove(user);
    throw Error('User not found');
  }
}
