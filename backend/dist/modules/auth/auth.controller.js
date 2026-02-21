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
        console.log(`[AUTH] Login attempt: ${loginDto.username}`);
        if (!loginDto.username || !loginDto.password) {
            console.error('[AUTH] Login failed: Missing credentials');
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
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        jwt_1.JwtService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map