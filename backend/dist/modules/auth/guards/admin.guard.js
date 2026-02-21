"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
let AdminGuard = class AdminGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log('[ADMIN] AdminGuard called');
        console.log('[ADMIN] User object:', JSON.stringify(user, null, 2));
        console.log('[ADMIN] Username:', user?.username);
        console.log('[ADMIN] Expected username: amine');
        if (!user || user.username !== 'amine') {
            console.log('[ADMIN] Access denied - not the single admin user:', user?.username);
            return false;
        }
        console.log('[ADMIN] Access granted - single admin user verified');
        return true;
    }
};
exports.AdminGuard = AdminGuard;
exports.AdminGuard = AdminGuard = __decorate([
    (0, common_1.Injectable)()
], AdminGuard);
//# sourceMappingURL=admin.guard.js.map