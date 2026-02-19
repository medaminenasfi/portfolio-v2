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
    // Check if any user already exists
    const userExists = await this.authService.userExists();

    if (userExists) {
      throw new Error('Registration is disabled. User already exists.');
    }

    return this.authService.register(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    console.log('🔐 Login attempt for:', loginDto.username);
    
    // Manual login without passport for now
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      console.log('❌ Login failed for:', loginDto.username);
      throw new Error('Invalid credentials');
    }
    
    console.log('✅ Login successful for:', loginDto.username);
    const payload = { username: user.username, sub: user.id };
    return {
      message: `${user.username} connected successfully!`,
      username: user.username,
      access_token: this.jwtService.sign(payload),
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
    return { message: 'Admin access granted' };
  }
}
