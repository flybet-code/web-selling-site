import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>): Promise<User> {
    const saltRounds = 10;
    if (!userData.password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
    
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
    
    return await this.usersRepository.save(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async validatePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }
}