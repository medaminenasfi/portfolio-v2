import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Request as ExpressRequest } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AdminGuard } from './guards/admin.guard';

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
    
    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    
    return {
      message: `${user.username} connected successfully!`,
      username: user.username,
      access_token: token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: ExpressRequest) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get('admin')
  getAdminOnly() {
    return { 
      message: 'Admin access granted',
      system: 'Single admin mode',
      adminUser: 'amine'
    };
  }

  @Get('system-info')
  async getSystemInfo() {
    const userCount = await this.authService.count();
    const users = await this.authService.getAllUsers();
    
    return {
      system: 'Single Admin Portfolio System',
      totalUsers: userCount.total,
      adminUser: users.users.length > 0 ? users.users[0].username : 'none',
      registrationAllowed: userCount.total === 0,
      features: [
        'Single admin user only',
        'Public project viewing',
        'Admin-only project management',
        'JWT authentication',
        'File uploads'
      ]
    };
  }

  @Post('reset-users')
  async resetUsers() {
    await this.authService.deleteAllUsers();
    return { message: 'All users deleted from database' };
  }

  @Get('all-users')
  async getAllUsers() {
    return await this.authService.getAllUsers();
  }

  @Post('test-login')
  async testLogin(@Body() body: any) {
    console.log('[AUTH] Test endpoint called');
    return {
      message: 'Test endpoint working',
      received: { username: body.username },
      timestamp: new Date().toISOString()
    };
  }
}
