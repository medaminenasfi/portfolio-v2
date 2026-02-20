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
    try {
      // Use CASCADE to handle foreign key constraints
      await this.userRepository.query('TRUNCATE TABLE "users" CASCADE');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const user = this.userRepository.create({
        username: 'admin',
        password: hashedPassword,
      });

      await this.userRepository.save(user);
      console.log('[SEED] Admin user created successfully');
    } catch (error) {
      console.log('[SEED] Could not truncate tables, checking if admin exists...');
      
      // Fallback: Check if admin exists, create if not
      const existingAdmin = await this.userRepository.findOne({
        where: { username: 'admin' }
      });
      
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const user = this.userRepository.create({
          username: 'admin',
          password: hashedPassword,
        });
        await this.userRepository.save(user);
        console.log('[SEED] Admin user created successfully');
      } else {
        console.log('[SEED] Admin user already exists');
      }
    }
  }
}
