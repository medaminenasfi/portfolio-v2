import { Controller, Post, Body } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // Check if any user already exists (single admin system)
    const userExists = await this.authService.userExists();

    if (userExists) {
      throw new Error('Registration disabled. Single admin user already exists.');
    }

    console.log('[AUTH] Creating single admin user:', registerDto.username);
    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log(`[AUTH] Login attempt: ${loginDto.username}`);
    
    // Validate input
    if (!loginDto.username || !loginDto.password) {
      console.error('[AUTH] Login failed: Missing credentials');
      throw new Error('Username and password are required');
    }
    
    // Manual login without passport for now
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      console.log(`[AUTH] Login failed: ${loginDto.username}`);
      throw new Error('Invalid credentials');
    }
    
    console.log(`[AUTH] Login successful: ${user.username}`);
    console.log('[AUTH] User object from validateUser:', JSON.stringify(user, null, 2));
    
    const payload = { username: user.username, sub: user.id };
    console.log('[AUTH] JWT payload created:', JSON.stringify(payload, null, 2));
    const token = this.jwtService.sign(payload);
    console.log('[AUTH] JWT token signed successfully');
    
    return {
      message: `${user.username} connected successfully!`,
      username: user.username,
      access_token: token,
    };
  }

}
