"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
let AuthController = class AuthController {
    constructor(authService, jwtService) {
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const userExists = await this.authService.userExists();
        if (userExists) {
            throw new common_1.ConflictException('Registration disabled. Single admin user already exists.');
        }
        console.log('[AUTH] Creating single admin user:', registerDto.username);
        return this.authService.register(registerDto);
    }
    async login(loginDto) {
        console.log('[AUTH] Login attempt received');
        console.log('[AUTH] Request body:', JSON.stringify(loginDto, null, 2));
        console.log(`[AUTH] Login attempt username: ${loginDto.username}`);
        if (!loginDto.username || !loginDto.password) {
            console.error('[AUTH] Login failed: Missing credentials');
            console.error('[AUTH] username:', loginDto.username);
            console.error('[AUTH] password:', loginDto.password ? '***present***' : '***missing***');
            throw new common_1.BadRequestException('Username and password are required');
        }
        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        if (!user) {
            console.log(`[AUTH] Login failed: ${loginDto.username}`);
            throw new common_1.UnauthorizedException('Invalid credentials');
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
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new admin user' }),
    (0, swagger_1.ApiBody)({ type: register_dto_1.RegisterDto }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'User already exists or registration disabled',
        schema: {
            example: {
                message: 'Registration disabled. Single admin user already exists.'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Invalid input data'
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Login user and return JWT token' }),
    (0, swagger_1.ApiBody)({ type: login_dto_1.LoginDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Login successful',
        schema: {
            example: {
                message: 'admin connected successfully!',
                username: 'admin',
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Invalid credentials',
        schema: {
            example: {
                message: 'Invalid credentials'
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request - Missing credentials',
        schema: {
            example: {
                message: 'Username and password are required'
            }
        }
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map