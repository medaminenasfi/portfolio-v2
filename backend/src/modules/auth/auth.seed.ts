import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';

@Injectable()
export class AuthSeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUserIfNotExists(): Promise<void> {
    const userExists = await this.userRepository.count();

    if (userExists === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const user = this.userRepository.create({
        username: 'admin',
        password: hashedPassword,
      });

      await this.userRepository.save(user);
      console.log('✅ User created successfully');
      console.log('📝 Username: admin');
      console.log('🔑 Password: admin123');
    } else {
      console.log('✅ User already exists');
    }
  }
}
