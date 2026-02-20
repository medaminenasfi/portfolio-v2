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
      // Delete all users to ensure single admin system
      await this.userRepository.query('TRUNCATE TABLE "users" CASCADE');
      
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const user = this.userRepository.create({
        username: 'amine',
        password: hashedPassword,
      });

      await this.userRepository.save(user);
      console.log('[SEED] Single admin user created: amine');
      console.log('[SYSTEM] Single admin mode activated');
    } catch (error) {
      console.log('[SEED] Could not truncate tables, checking if admin exists...');
      
      // Fallback: Check if admin exists, create if not
      const existingAdmin = await this.userRepository.findOne({
        where: { username: 'amine' }
      });
      
      if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const user = this.userRepository.create({
          username: 'amine',
          password: hashedPassword,
        });
        await this.userRepository.save(user);
        console.log('[SEED] Single admin user created: amine');
      } else {
        console.log('[SEED] Single admin user already exists: amine');
      }
      console.log('[SYSTEM] Single admin mode active');
    }
  }
}
