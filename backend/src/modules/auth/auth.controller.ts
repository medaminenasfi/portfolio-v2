import {
  BadRequestException,
  ConflictException,
  Controller,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new admin user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ 
    status: 201, 
    description: 'User successfully registered',
    schema: {
      example: {
        message: 'User registered successfully',
        user: {
          id: 1,
          username: 'admin',
          email: 'admin@example.com'
        }
      }
    }
  })
  @ApiResponse({ 
    status: 409, 
    description: 'User already exists or registration disabled',
    schema: {
      example: {
        message: 'Registration disabled. Single admin user already exists.'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Invalid input data' 
  })
  async register(@Body() registerDto: RegisterDto) {
    // Check if any user already exists (single admin system)
    const userExists = await this.authService.userExists();

    if (userExists) {
      throw new ConflictException('Registration disabled. Single admin user already exists.');
    }

    console.log('[AUTH] Creating single admin user:', registerDto.username);
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user and return JWT token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    schema: {
      example: {
        message: 'admin connected successfully!',
        username: 'admin',
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
      }
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Invalid credentials',
    schema: {
      example: {
        message: 'Invalid credentials'
      }
    }
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Bad request - Missing credentials',
    schema: {
      example: {
        message: 'Username and password are required'
      }
    }
  })
  async login(@Body() loginDto: LoginDto) {
    console.log('[AUTH] Login attempt received');
    console.log('[AUTH] Request body:', JSON.stringify(loginDto, null, 2));
    console.log(`[AUTH] Login attempt username: ${loginDto.username}`);
    
    // Validate input
    if (!loginDto.username || !loginDto.password) {
      console.error('[AUTH] Login failed: Missing credentials');
      console.error('[AUTH] username:', loginDto.username);
      console.error('[AUTH] password:', loginDto.password ? '***present***' : '***missing***');
      throw new BadRequestException('Username and password are required');
    }
    
    // Manual login without passport for now
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      console.log(`[AUTH] Login failed: ${loginDto.username}`);
      throw new UnauthorizedException('Invalid credentials');
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
