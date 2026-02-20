import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<User>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    count(): Promise<{
        total: number;
    }>;
    userExists(): Promise<boolean>;
    deleteAllUsers(): Promise<void>;
    getAllUsers(): Promise<{
        total: number;
        users: User[];
    }>;
    validateUser(username: string, pass: string): Promise<any>;
}
