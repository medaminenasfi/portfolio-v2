import { JwtService } from '@nestjs/jwt';
import { Request as ExpressRequest } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private readonly authService;
    private readonly jwtService;
    constructor(authService: AuthService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<import("./entities/user.entity").User>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        username: any;
        access_token: string;
    }>;
    getProfile(req: ExpressRequest): Express.User | undefined;
    getAdminOnly(): {
        message: string;
    };
}
