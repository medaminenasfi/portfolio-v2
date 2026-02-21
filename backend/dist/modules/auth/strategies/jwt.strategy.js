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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const extractBearerToken = (req) => {
    const authorization = req?.headers?.authorization || req?.headers?.Authorization;
    if (!authorization || typeof authorization !== 'string') {
        console.log('[JWT] Authorization header missing');
        return null;
    }
    const [scheme, token] = authorization.split(' ');
    if (scheme?.toLowerCase() !== 'bearer' || !token) {
        console.log('[JWT] Authorization header present but not Bearer scheme');
        return null;
    }
    return token;
};
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                extractBearerToken,
                passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
        });
        console.log('[JWT] JWT Strategy initialized with secret:', process.env.JWT_SECRET ? 'Set' : 'Not set');
    }
    async validate(payload) {
        console.log('[JWT] Full payload received:', JSON.stringify(payload, null, 2));
        console.log('[JWT] Payload fields:', Object.keys(payload));
        const user = {
            userId: payload.sub || payload.userId || payload.id,
            username: payload.username
        };
        console.log('[JWT] User object created:', JSON.stringify(user, null, 2));
        return user;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map